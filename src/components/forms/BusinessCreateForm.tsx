import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useBusinessCreateSchema } from '@/schemas/business-create.schema'
import { getStaticRoute } from '@/static/page'
import { BusinessApplication, BusinessType } from '@/types/business'
import Alert from '@turistikrota/ui/alert'
import Input from '@turistikrota/ui/form/input'
import Select from '@turistikrota/ui/form/select'
import Textarea from '@turistikrota/ui/form/textarea'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Spin from 'sspin/dist/esm/Spin'
import BusinessTypeCard from './BusinessTypeCard'
import { MultiStepForm, Step } from './MultiStepForm'
type CorporationType = {
  name: string
  value: string
}

const corporationTypes: CorporationType[] = [
  {
    name: 'corporationTypes.anonymous',
    value: 'anonymous',
  },
  {
    name: 'corporationTypes.soleProprietorship',
    value: 'sole_proprietorship',
  },
  {
    name: 'corporationTypes.limited',
    value: 'limited',
  },
  {
    name: 'corporationTypes.collective',
    value: 'collective',
  },
  {
    name: 'corporationTypes.cooperative',
    value: 'cooperative',
  },
  {
    name: 'corporationTypes.ordinaryPartnership',
    value: 'ordinary_partnership',
  },
  {
    name: 'corporationTypes.ordinaryLimitedPartnership',
    value: 'ordinary_limited_partnership',
  },
  {
    name: 'corporationTypes.limitedPartnershipShareCapital',
    value: 'limited_partnership_share_capital',
  },
  {
    name: 'corporationTypes.other',
    value: 'other',
  },
]

const BusinessCreateForm = () => {
  const schema = useBusinessCreateSchema()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('create')
  const toast = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const maxDate = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    now.setFullYear(now.getFullYear() - 18)
    return now.toISOString().split('T')[0]
  }, [])
  const form = useFormik({
    initialValues: {
      nickName: undefined,
      realName: undefined,
      businessType: BusinessType.Corporation,
      firstName: undefined,
      lastName: undefined,
      identityNumber: undefined,
      serialNumber: undefined,
      province: undefined,
      application: BusinessApplication.Accommodation,
      district: undefined,
      address: undefined,
      dateOfBirth: '',
      taxNumber: undefined,
      type: 'other',
    },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: (values) => {
      if (values.businessType === BusinessType.Corporation) {
        values.dateOfBirth = maxDate
      }
      setIsLoading(true)
      httpClient
        .post(apiUrl(Services.Business, `/`), values)
        .then(() => {
          toast.success(t('success'))
          navigate(getStaticRoute(i18n.language).business.select)
        })
        .catch((err) => {
          parseApiError({
            error: err.response.data,
            form,
            toast,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
  })

  useEffect(() => {
    type StepErrorsType = keyof typeof form.errors
    const stepErrors: StepErrorsType[][] = [
      ['businessType', 'application'],
      ['firstName', 'lastName', 'identityNumber', 'serialNumber', 'dateOfBirth', 'taxNumber', 'type'],
      ['province', 'district', 'address'],
      ['nickName', 'realName'],
    ]
    for (let i = 0; i < stepErrors.length; i++) {
      const errors = stepErrors[i]
      const hasError = errors.some((error) => form.errors[error])
      if (hasError) {
        setCurrentStep(i)
        break
      }
    }
  }, [form.isSubmitting])

  const selectBusinessType = (type: string) => {
    form.setFieldValue('businessType', type)
  }

  const selectBusinessApplication = (application: string) => {
    if (application === BusinessApplication.Accommodation) {
      form.setFieldValue('businessType', BusinessType.Corporation)
    }
    form.setFieldValue('application', application)
  }

  return (
    <Spin loading={isLoading}>
      <div className='border-b py-2'>
        <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white'>
          {t('title')}
        </h1>
      </div>

      <MultiStepForm currentStep={currentStep} onStepChange={setCurrentStep} onSubmit={form.handleSubmit}>
        <Step>
          <div className='mb-2 rounded-md'>
            <h2 className='text-left text-lg font-bold lg:block'>{t('application.title')}</h2>
            <p className='text-left text-sm text-gray-600 dark:text-gray-400 lg:block'>{t('application.subtitle')}</p>
            <div className='mb-3 mt-2 flex w-full justify-center gap-3'>
              <BusinessTypeCard
                icon='bx-home-smile'
                title={t(`applications.${BusinessApplication.Accommodation}`)}
                onClick={() => selectBusinessApplication(BusinessApplication.Accommodation)}
                selected={form.values.application === BusinessApplication.Accommodation}
                size='sm'
              />
              <BusinessTypeCard
                icon='bx-map-pin'
                title={t(`applications.${BusinessApplication.Place}`)}
                onClick={() => selectBusinessApplication(BusinessApplication.Place)}
                selected={form.values.application === BusinessApplication.Place}
                size='sm'
              />
              <BusinessTypeCard
                icon='bxs-megaphone'
                title={t(`applications.${BusinessApplication.Advert}`)}
                onClick={() => selectBusinessApplication(BusinessApplication.Advert)}
                selected={form.values.application === BusinessApplication.Advert}
                size='sm'
              />
            </div>
          </div>
          <div className='mb-2 rounded-md'>
            <h2 className='text-left text-lg font-bold lg:block'>{t('type-select.title')}</h2>
            <p className='text-left text-sm text-gray-600 dark:text-gray-400 lg:block'>{t('type-select.subtitle')}</p>
          </div>
          {form.values.application === BusinessApplication.Accommodation && (
            <Alert type='info' className='mb-2'>
              <Alert.Title>{t('applications.error.accommodation.title')}</Alert.Title>
              <Alert.Description>{t('applications.error.accommodation.content')}</Alert.Description>
            </Alert>
          )}
          <div className='flex w-full justify-center gap-3'>
            <BusinessTypeCard
              icon='bx-buildings'
              title={t(`type-select.${BusinessType.Corporation}.title`)}
              description={t(`type-select.${BusinessType.Corporation}.subtitle`)}
              onClick={() => selectBusinessType(BusinessType.Corporation)}
              selected={form.values.businessType === BusinessType.Corporation}
            />
            <BusinessTypeCard
              icon='bx-user'
              title={t(`type-select.${BusinessType.Individual}.title`)}
              description={t(`type-select.${BusinessType.Individual}.subtitle`)}
              onClick={() => selectBusinessType(BusinessType.Individual)}
              selected={form.values.businessType === BusinessType.Individual}
              disabled={form.values.application === BusinessApplication.Accommodation}
            />
          </div>
        </Step>
        {form.values.businessType === 'individual' ? (
          <Step className='flex flex-col gap-x-2 gap-y-4'>
            <div className='flex gap-2'>
              <div className='w-full'>
                <Input
                  label={t('individual.firstName')}
                  id='firstName'
                  name='firstName'
                  type='text'
                  autoComplete='firstName'
                  required
                  value={form.values.firstName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.errors.firstName}
                  ariaLabel={t('individual.firstName')}
                />
              </div>
              <div className='w-full'>
                <Input
                  label={t('individual.lastName')}
                  id='lastName'
                  name='lastName'
                  type='text'
                  autoComplete='lastName'
                  required
                  value={form.values.lastName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.errors.lastName}
                  ariaLabel={t('individual.lastName')}
                />
              </div>
            </div>
            <Input
              label={t('individual.identityNumber')}
              id='identityNumber'
              name='identityNumber'
              type='text'
              required
              autoComplete='identityNumber'
              value={form.values.identityNumber}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.identityNumber}
              ariaLabel={t('individual.identityNumber')}
            />
            <Input
              label={t('individual.serialNumber')}
              id='serialNumber'
              name='serialNumber'
              type='text'
              autoComplete='serialNumber'
              required
              value={form.values.serialNumber}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.serialNumber}
              ariaLabel={t('individual.serialNumber')}
            />
            <Input
              label={t('individual.dateOfBirth')}
              id='dateOfBirth'
              name='dateOfBirth'
              type='date'
              autoComplete='dateOfBirth'
              required
              max={maxDate}
              value={form.values.dateOfBirth}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.dateOfBirth}
              ariaLabel={t('individual.dateOfBirth')}
            />
          </Step>
        ) : (
          <Step className='flex flex-col gap-x-2 gap-y-4'>
            <Input
              label={t('corporation.taxNumber')}
              id='taxNumber'
              name='taxNumber'
              type='text'
              autoComplete='taxNumber'
              required
              value={form.values.taxNumber}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.taxNumber}
              ariaLabel={t('corporation.taxNumber')}
            />
            <Select
              label={t('corporation.corpType')}
              name='type'
              id='type'
              autoComplete='type'
              required
              value={form.values.type}
              onChange={form.handleChange}
              error={form.errors.type}
              ariaLabel={t('corporation.corpType')}
            >
              <Select.DefaultOption />
              {corporationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {t(type.name)}
                </option>
              ))}
            </Select>
          </Step>
        )}
        <Step>
          <div className='mb-2'>
            <h2 className='text-left text-lg font-bold lg:block'>{t('billing.title')}</h2>
            <p className='text-left text-sm text-gray-600 dark:text-gray-400 lg:block'>{t('billing.subtitle')}</p>
          </div>
          <div className='flex flex-col gap-x-2 gap-y-4'>
            <div className='flex gap-2'>
              <div className='w-full'>
                <Input
                  label={t('billing.province')}
                  id='province'
                  name='province'
                  type='text'
                  autoComplete='province'
                  required
                  value={form.values.province}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.errors.province}
                  ariaLabel={t('billing.province')}
                />
              </div>
              <div className='w-full'>
                <Input
                  label={t('billing.district')}
                  id='district'
                  name='district'
                  type='text'
                  autoComplete='district'
                  required
                  value={form.values.district}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.errors.district}
                  ariaLabel={t('billing.district')}
                />
              </div>
            </div>
            <Textarea
              label={t('billing.address')}
              id='address'
              name='address'
              autoComplete='address'
              required
              value={form.values.address}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.address}
              ariaLabel={t('billing.address')}
            />
          </div>
        </Step>
        <Step className='flex flex-col gap-x-2 gap-y-4'>
          <Input
            label={t('general.nickName')}
            id='nickName'
            name='nickName'
            autoComplete='nickName'
            required
            value={form.values.nickName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.errors.nickName}
            ariaLabel={t('general.nickName')}
          />
          <Input
            label={t('general.realName')}
            id='realName'
            name='realName'
            autoComplete='realName'
            required
            value={form.values.realName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.errors.realName}
            ariaLabel={t('general.realName')}
          />
        </Step>
      </MultiStepForm>
    </Spin>
  )
}

export default BusinessCreateForm
