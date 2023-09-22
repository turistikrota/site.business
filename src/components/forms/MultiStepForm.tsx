import Button from '@turistikrota/ui/button'
import FormSection from '@turistikrota/ui/form/section'
import React, { ReactNode } from 'react'

type StepProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export const Step: React.FC<StepProps> = ({ children }) => {
  return <>{children}</>
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
      <FormSection.Head>
        <div className='flex items-center mb-4 justify-center'>
          {children.map((_, index) => (
            <div key={index} className={`flex items-center ${index < children.length - 1 ? 'flex-auto' : ''}`}>
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full bg-primary transition-colors text-lg ${
                  currentStep === index || index < currentStep ? '' : 'bg-opacity-20'
                }`}
              >
                {currentStep === index ? (
                  index + 1
                ) : index < currentStep ? (
                  <i className='bx bx-sm bx-check'></i>
                ) : (
                  index + 1
                )}
              </div>
              {index < children.length - 1 && (
                <div
                  className={`flex-1 h-px bg-primary ${
                    currentStep === index || index < currentStep ? '' : 'bg-opacity-20'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <FormSection.Head.Title>Form title</FormSection.Head.Title>
        <FormSection.Head.Subtitle>Form subtitle</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body>
        {React.cloneElement(children[currentStep] as React.ReactElement, { key: currentStep })}
      </FormSection.Body>
      {hideFooterSteps?.includes(currentStep) ? null : (
        <FormSection.Footer>
          <div className='flex justify-between'>
            <Button onClick={prevStep} block={false} disabled={currentStep === 0} variant='gray'>
              geri
            </Button>
            <Button
              onClick={nextStep}
              block={false}
              htmlType={currentStep === children.length - 1 ? 'submit' : 'button'}
            >
              {currentStep === children.length - 1 ? 'Gönder' : 'İleri'}
            </Button>
          </div>
        </FormSection.Footer>
      )}
    </FormSection>
  )
}
