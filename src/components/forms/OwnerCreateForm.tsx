import Alert from '@turistikrota/ui/alert'
import Input from '@turistikrota/ui/form/input'
import Textarea from '@turistikrota/ui/form/textarea'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin/dist/esm/Spin'
import { MultiStepForm, Step } from './MultiStepForm'

type OwnerTypeCardProps = {
  icon: string
  title: string
  description: string
  onClick: () => void
  selected?: boolean
}

const OwnerTypeCard: React.FC<OwnerTypeCardProps> = ({ description, icon, onClick, title, selected }) => {
  return (
    <div
      className={`w-40 h-40 rounded-md p-4 flex flex-col items-center justify-center hover:bg-input transition-colors cursor-pointer relative ${
        selected ? 'bg-input' : 'bg-third'
      }`}
      onClick={onClick}
    >
      {selected && <span className='absolute top-2 left-2 p-2 rounded-full bg-primary text-white'></span>}
      <i className={`bx bx-2xl ${icon}`}></i>
      <div className='font-medium text-gray-900 dark:text-white mt-1'>{title}</div>
      <p className='text-sm text-gray-500 dark:text-gray-400 text-center'>{description}</p>
    </div>
  )
}

const OwnerCreateForm = () => {
  const { t } = useTranslation('create')
  const [step, setStep] = useState(0)
  const loading = false

  const handleSubmit = () => {}

  const selectOwnerType = () => {
    setStep(1)
  }

  /*
  	NickName        string `json:"nickName" validate:"required"`
	RealName        string `json:"realName" validate:"required"`
	OwnerType       string `json:"ownerType" validate:"required,oneof=individual corporation"`
	FirstName       string `json:"firstName" validate:"required_if=OwnerType individual"`
	LastName        string `json:"lastName" validate:"required_if=OwnerType individual"`
	IdentityNumber  string `json:"identityNumber" validate:"required_if=OwnerType individual"`
	SerialNumber    string `json:"serialNumber" validate:"required_if=OwnerType individual"`
	Province        string `json:"province" validate:"required"`
	District        string `json:"district" validate:"required"`
	Address         string `json:"address" validate:"required"`
	DateOfBirth     string `json:"dateOfBirth" validate:"required_if=OwnerType individual,datetime=2006-01-02"`
	TaxNumber       string `json:"taxNumber" validate:"required_if=OwnerType corporation"`
	CorporationType string `json:"type" validate:"required_if=OwnerType corporation"`
  */

  return (
    <Spin loading={loading}>
      <div className='py-4 border-b'>
        <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          {t('title')}
        </h1>
      </div>

      <MultiStepForm currentStep={step} onStepChange={setStep} onSubmit={handleSubmit}>
        <Step>
          <div className='bg-second pb-4 rounded-t-md'>
            <h2 className='text-lg text-left font-bold lg:block'>{t('type-select.title')}</h2>
            <p className='text-gray-600 text-left text-sm dark:text-gray-400 lg:block'>{t('type-select.subtitle')}</p>
          </div>
          <Alert type='warning' className='mb-4'>
            <Alert.Title>{t('type-select.info.title')}</Alert.Title>
            <Alert.Description>{t('type-select.info.content')}</Alert.Description>
          </Alert>
          <div className='w-full flex justify-center gap-3'>
            <OwnerTypeCard
              icon='bx-buildings'
              title={t('type-select.corporation.title')}
              description={t('type-select.corporation.subtitle')}
              onClick={() => {
                selectOwnerType()
              }}
              selected
            />
            <OwnerTypeCard
              icon='bx-user'
              title={t('type-select.individual.title')}
              description={t('type-select.individual.subtitle')}
              onClick={() => {
                selectOwnerType()
              }}
            />
          </div>
        </Step>
        <Step className='space-y-4 md:space-y-6'>
          <div className='flex gap-4 md:gap-6'>
            <Input
              label={t('individual.firstName')}
              id='userName'
              name='userName'
              type='text'
              autoComplete='user-name'
              required
              autoFocus
            />
            <Input
              label={t('individual.lastName')}
              id='userName'
              name='userName'
              type='text'
              autoComplete='user-name'
              required
              autoFocus
            />
          </div>
          <Input
            label={t('individual.identityNumber')}
            id='userName'
            name='userName'
            type='text'
            autoComplete='user-name'
            required
            autoFocus
          />

          <small className='text-secondary'>{t('hashInfo')}</small>
          <Input
            label={t('individual.serialNumber')}
            id='userName'
            name='userName'
            type='text'
            autoComplete='user-name'
            required
            autoFocus
          />

          <small className='text-secondary'>{t('hashInfo')}</small>
          <Input
            label={t('individual.dateOfBirth')}
            id='userName'
            name='userName'
            type='text'
            autoComplete='user-name'
            required
            autoFocus
          />
        </Step>
        <Step className='space-y-4 md:space-y-6'>
          <Input
            label={t('corporation.taxNumber')}
            id='userName'
            name='userName'
            type='text'
            autoComplete='user-name'
            required
            autoFocus
          />
          <small className='text-secondary'>{t('hashInfo')}</small>
          <Input
            label={t('corporation.corpType')}
            id='userName'
            name='userName'
            type='text'
            autoComplete='user-name'
            required
            autoFocus
          />
        </Step>
        <Step>
          <div className='bg-second pb-4 rounded-t-md'>
            <h2 className='text-lg text-left font-bold lg:block'>{t('billing.title')}</h2>
            <p className='text-gray-600 text-left text-sm dark:text-gray-400 lg:block'>{t('billing.subtitle')}</p>
          </div>
          <div className='space-y-4 md:space-y-6'>
            <div className='flex gap-4 md:gap-6'>
              <Input
                label={t('billing.province')}
                id='userName'
                name='userName'
                type='text'
                autoComplete='user-name'
                required
                autoFocus
              />
              <Input
                label={t('billing.district')}
                id='userName'
                name='userName'
                type='text'
                autoComplete='user-name'
                required
                autoFocus
              />
            </div>
            <Textarea
              label={t('billing.address')}
              id='userName'
              name='userName'
              type='textarea'
              autoComplete='user-name'
              required
              autoFocus
            />
          </div>
        </Step>
        <Step className='space-y-4 md:space-y-6'>
          <Input
            label={t('general.nickName')}
            id='userName'
            name='userName'
            type='text'
            autoComplete='user-name'
            required
            autoFocus
          />
          <Input
            label={t('general.realName')}
            id='userName'
            name='userName'
            type='text'
            autoComplete='user-name'
            required
            autoFocus
          />
        </Step>
      </MultiStepForm>
    </Spin>
  )
}

export default OwnerCreateForm
