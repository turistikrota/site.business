import MetaWrapper from '@/components/MetaWrapper'
import { Services, apiUrl } from '@/config/services'
import { useCurrentOwner } from '@/contexts/currentOwner'
import { httpClient } from '@/http/client'
import { useInviteCreateSchema } from '@/schemas/invite-create.schema'
import { getStaticRoute } from '@/static/page'
import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import Radio from '@turistikrota/ui/form/radio'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function InviteCreateView() {
  const { t, i18n } = useTranslation('invite-create')
  const [loading, setLoading] = useState<boolean>(false)
  const [current] = useCurrentOwner()
  const toast = useToast()
  const schema = useInviteCreateSchema()
  const navigate = useNavigate()
  const isDesktop = useIsDesktop()
  const form = useFormik({
    initialValues: {
      email: '',
      locale: i18n.language,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: schema,
    onSubmit: (values) => {
      setLoading(true)
      httpClient
        .post(apiUrl(Services.Owner, `/~${current.owner.nickName}/invite`), values)
        .then((res) => {
          if ([200, 201].includes(res.status)) {
            toast.success(t('success'))
            navigate(getStaticRoute(i18n.language).owner.details.invite)
            return
          }
        })
        .catch((err: any) => {
          if (err && err.response && err.response.data) return parseApiError({ error: err.response.data, form, toast })
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })
  return (
    <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
      <section className='p-4 lg:pl-0 max-w-4xl mx-auto relative'>
        <form onSubmit={form.handleSubmit}>
          <div className='space-y-4 md:space-y-6'>
            <div>
              <Input
                id='email'
                type='email'
                name='email'
                autoComplete='email'
                label={t('fields.email')}
                ariaLabel={t('fields.email')}
                value={form.values.email}
                error={form.errors.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.email && <br />}
              <small className='text-secondary'>{t('info.email')}</small>
            </div>
            <div>
              <h4 className='text-sm font-medium text-gray-700'>{t('fields.locale')}</h4>
              <small className='text-secondary'>{t('info.locale')}</small>
              <Radio
                name='locale'
                id='tr'
                checked={form.values.locale === 'tr'}
                reverse={!isDesktop}
                effect={isDesktop ? 'hover' : undefined}
                onChange={(sel: boolean) => {
                  if (sel) form.setFieldValue('locale', 'tr')
                  else form.setFieldValue('locale', 'en')
                }}
              >
                Türkçe
              </Radio>
              <Radio
                name='locale'
                id='en'
                checked={form.values.locale === 'en'}
                reverse={!isDesktop}
                effect={isDesktop ? 'hover' : undefined}
                onChange={(sel: boolean) => {
                  if (sel) form.setFieldValue('locale', 'en')
                  else form.setFieldValue('locale', 'tr')
                }}
              >
                English
              </Radio>
            </div>
            <Button block={false} htmlType='submit' disabled={loading}>
              {t(loading ? 'loading' : 'invite')}
            </Button>
          </div>
        </form>
      </section>
    </MetaWrapper>
  )
}

InviteCreateView.displayName = 'InviteCreateView'
export { InviteCreateView as Component }
