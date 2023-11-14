import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useAccount } from '@/layouts/AccountSelectionLayout'
import { useOwnerCreateSchema } from '@/schemas/owner-create.schema'
import Alert from '@turistikrota/ui/alert'
import Input from '@turistikrota/ui/form/input'
import Select from '@turistikrota/ui/form/select'
import Textarea from '@turistikrota/ui/form/textarea'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Spin from 'sspin/dist/esm/Spin'
import { MultiStepForm, Step } from './MultiStepForm'

type OwnerTypeCardProps = {
  icon: string
  title: string
  description: string
  onClick: () => void
  selected?: boolean
}

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

const OwnerTypeCard: React.FC<OwnerTypeCardProps> = ({ description, icon, onClick, title, selected }) => {
  return (
    <div
      className={`relative flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-md p-4 transition-colors hover:bg-input ${
        selected ? 'bg-input' : 'bg-third'
      }`}
      onClick={onClick}
    >
      {selected && <span className='absolute left-2 top-2 rounded-full bg-primary p-2 text-white'></span>}
      <i className={`bx bx-2xl ${icon}`}></i>
      <div className='mt-1 font-medium text-gray-900 dark:text-white'>{title}</div>
      <p className='text-center text-sm text-gray-500 dark:text-gray-400'>{description}</p>
    </div>
  )
}

const OwnerCreateForm = () => {
  const schema = useOwnerCreateSchema()
  const navigate = useNavigate()
  const { t } = useTranslation('create')
  const toast = useToast()
  const { current } = useAccount()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const form = useFormik({
    initialValues: {
      nickName: undefined,
      realName: undefined,
      ownerType: 'corporation',
      firstName: undefined,
      lastName: undefined,
      identityNumber: undefined,
      serialNumber: undefined,
      province: undefined,
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
      if (values.ownerType === 'corporation') {
        values.dateOfBirth = '2006-01-02'
      }
      setIsLoading(true)
      httpClient
        .post(apiUrl(Services.Owner, `/@${current?.userName}`), values)
        .then(() => {
          toast.success(t('success'))
          navigate('/')
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
      ['ownerType'],
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

  const selectOwnerType = (type: string) => {
    form.setFieldValue('ownerType', type)
  }

  return (
    <Spin loading={isLoading}>
      <div className='border-b py-4'>
        <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          {t('title')}
        </h1>
      </div>

      <MultiStepForm currentStep={currentStep} onStepChange={setCurrentStep} onSubmit={form.handleSubmit}>
        <Step>
          <div className='rounded-t-md bg-second pb-4'>
            <h2 className='text-left text-lg font-bold lg:block'>{t('type-select.title')}</h2>
            <p className='text-left text-sm text-gray-600 dark:text-gray-400 lg:block'>{t('type-select.subtitle')}</p>
          </div>
          <Alert type='warning' className='mb-4'>
            <Alert.Title>{t('type-select.info.title')}</Alert.Title>
            <Alert.Description>{t('type-select.info.content')}</Alert.Description>
          </Alert>
          <div className='flex w-full justify-center gap-3'>
            <OwnerTypeCard
              icon='bx-buildings'
              title={t('type-select.corporation.title')}
              description={t('type-select.corporation.subtitle')}
              onClick={() => selectOwnerType('corporation')}
              selected={form.values.ownerType === 'corporation'}
            />
            <OwnerTypeCard
              icon='bx-user'
              title={t('type-select.individual.title')}
              description={t('type-select.individual.subtitle')}
              onClick={() => selectOwnerType('individual')}
              selected={form.values.ownerType === 'individual'}
            />
          </div>
        </Step>
        {form.values.ownerType === 'individual' ? (
          <Step className='space-y-4 md:space-y-6'>
            <div className='flex gap-4 md:gap-6'>
              <div>
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
              <div>
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
            {form.errors.identityNumber && <br />}
            <small className='text-secondary'>{t('hashInfo')}</small>
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
            {form.errors.serialNumber && <br />}
            <small className='text-secondary'>{t('hashInfo')}</small>
            <Input
              label={t('individual.dateOfBirth')}
              id='dateOfBirth'
              name='dateOfBirth'
              type='date'
              autoComplete='dateOfBirth'
              required
              value={form.values.dateOfBirth}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.dateOfBirth}
              ariaLabel={t('individual.dateOfBirth')}
            />
          </Step>
        ) : (
          <Step className='space-y-4 md:space-y-6'>
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
            {form.errors.taxNumber && <br />}
            <small className='text-secondary'>{t('hashInfo')}</small>
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
            {form.errors.type && <br />}
            <small className='text-secondary'>{t('analyticsInfo')}</small>
          </Step>
        )}
        <Step>
          <div className='rounded-t-md bg-second pb-4'>
            <h2 className='text-left text-lg font-bold lg:block'>{t('billing.title')}</h2>
            <p className='text-left text-sm text-gray-600 dark:text-gray-400 lg:block'>{t('billing.subtitle')}</p>
          </div>
          <div className='space-y-4 md:space-y-6'>
            <div className='flex gap-4 md:gap-6'>
              <div>
                {' '}
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
              <div>
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
        <Step className='space-y-4 md:space-y-6'>
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

export default OwnerCreateForm
