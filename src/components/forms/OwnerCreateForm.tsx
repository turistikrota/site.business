import { useState } from 'react'
import Spin from 'sspin/dist/esm/Spin'
import { MultiStepForm, Step } from './MultiStepForm'

const OwnerCreateForm = () => {
  const loading = false

  const [step, setStep] = useState(0)

  const handleSubmit = () => {
    console.log('Form submitted!')
  }

  return (
    <Spin loading={loading}>
      <MultiStepForm currentStep={step} onStepChange={setStep} onSubmit={handleSubmit}>
        <Step title='Adım 1' subtitle='Bilgilerinizi girin'>
          <div>
            <label>Adınız:</label>
            <input type='text' className='bg-red-500' />
          </div>
        </Step>
        <Step title='Adım 2' subtitle='Daha fazla bilgi'>
          <div>
            <label>Email:</label>
            <input type='email' />
          </div>
        </Step>
        <Step title='Adım 3' subtitle='Son adım'>
          <div>
            <label>Telefon:</label>
            <input type='tel' />
          </div>
        </Step>
      </MultiStepForm>
    </Spin>
  )
}

export default OwnerCreateForm
