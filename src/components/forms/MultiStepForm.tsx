import Button from '@turistikrota/ui/button'
import FormSection from '@turistikrota/ui/form/section'
import { PropsWithClassName } from '@turistikrota/ui/types'
import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export const Step: React.FC<React.PropsWithChildren & PropsWithClassName> = ({ children, className }) => {
  return <section className={className}>{children}</section>
}

type MultiStepFormProps = {
  currentStep: number
  onStepChange: (step: number) => void
  children: ReactNode[]
  onSubmit: () => void
  hideFooterSteps?: number[]
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  children,
  currentStep,
  onStepChange,
  onSubmit,
  hideFooterSteps,
}) => {
  const { t } = useTranslation('create')

  const nextStep = () => {
    if (currentStep < children.length - 1) {
      onStepChange(currentStep + 1)
    } else {
      onSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1)
    }
  }

  return (
    <FormSection>
      <FormSection.Body>
        {React.cloneElement(children[currentStep] as React.ReactElement, { key: currentStep })}
      </FormSection.Body>
      {hideFooterSteps?.includes(currentStep) ? null : (
        <FormSection.Footer>
          <div className='flex justify-between'>
            <Button onClick={prevStep} block={false} disabled={currentStep === 0} variant='gray'>
              {t('back')}
            </Button>
            <Button
              onClick={nextStep}
              block={false}
              htmlType={currentStep === children.length - 1 ? 'submit' : 'button'}
            >
              {currentStep === children.length - 1 ? t('submit') : t('next')}
            </Button>
          </div>
        </FormSection.Footer>
      )}
    </FormSection>
  )
}
