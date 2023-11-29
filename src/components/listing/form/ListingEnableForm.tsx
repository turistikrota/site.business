import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import Condition from '@turistikrota/ui/condition'
import LineForm from '@turistikrota/ui/form/line'
import ToggleButton from '@turistikrota/ui/form/toggle'
import ErrorText from '@turistikrota/ui/text/error'
import { useToast } from '@turistikrota/ui/toast'
import { isBaseResponse } from '@turistikrota/ui/types'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin'

type Props = {
  uuid: string
  onOk: () => void
}

const ListingEnableForm: React.FC<Props> = ({ uuid, onOk }) => {
  const { t } = useTranslation('listings')
  const toast = useToast()
  const [error, setError] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleEnable = () => {
    setIsLoading(true)
    httpClient
      .patch(apiUrl(Services.Listing, `/${uuid}/enable`), null)
      .then((res) => {
        if (res.status === 200) return onOk()
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          setError(err.response.data)
          parseApiError({
            error: err.response.data,
            toast,
          })
          return
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleChange = (val: boolean) => {
    if (!val) return
    toast.askSuccess({
      cancelText: t('detail.activation.enable.cancel'),
      confirmText: t('detail.activation.enable.confirm'),
      description: t('detail.activation.enable.description'),
      title: t('detail.activation.enable.title'),
      onConfirm: () => {
        handleEnable()
      },
    })
  }
  return (
    <Spin loading={isLoading}>
      <div className='rounded-t-md bg-second p-4 transition-colors duration-200 hover:bg-third'>
        <LineForm>
          <LineForm.Left>
            <LineForm.Left.Title>{t('detail.activation.title')}</LineForm.Left.Title>
            <LineForm.Left.Description>{t('detail.activation.passive')}</LineForm.Left.Description>
          </LineForm.Left>
          <LineForm.Right>
            <ToggleButton
              defaultChecked={false}
              onChange={handleChange}
              variant='success'
              title={t('detail.activation.enable.alt')}
            ></ToggleButton>
          </LineForm.Right>
        </LineForm>
        <Condition value={!isLoading && !!error && isBaseResponse(error)}>
          <ErrorText>{isBaseResponse(error) && error.message}</ErrorText>
        </Condition>
      </div>
    </Spin>
  )
}

export default ListingEnableForm
