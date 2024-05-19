import MetaWrapper from '@/components/MetaWrapper'
import { Services, apiUrl } from '@/config/services'
import { useCurrentBusiness } from '@/contexts/currentBusiness'
import { httpClient } from '@/http/client'
import RoleGuardView from '@/layouts/RoleGuard'
import { useInviteCreateSchema } from '@/schemas/invite-create.schema'
import { getStaticRoute } from '@/static/page'
import { BusinessRoles } from '@/static/role'
import DomLink from '@/utils/link'
import Breadcrumb from '@turistikrota/ui/breadcrumb'
import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import Radio from '@turistikrota/ui/form/radio'
import FormSection from '@turistikrota/ui/form/section'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

function InviteCreateView() {
  const { t, i18n } = useTranslation(['invite-create', 'general'])
  const [loading, setLoading] = useState<boolean>(false)
  const [current] = useCurrentBusiness()
  const toast = useToast()
  const schema = useInviteCreateSchema()
  const navigate = useNavigate()
  const isDesktop = useIsDesktop()
  const path = useLocation().pathname
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
        .post(apiUrl(Services.Business, `/~${current.business.nickName}/invite`), values)
        .then((res) => {
          if ([200, 201].includes(res.status)) {
            toast.success(t('success'))
            navigate(getStaticRoute(i18n.language).invite.list)
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
    <RoleGuardView roles={[BusinessRoles.Super, BusinessRoles.InviteCreate]}>
      <MetaWrapper title={t('meta.title')} description={t('meta.description')} keywords={t('meta.keywords')}>
        <section className='relative space-y-4'>
          <Breadcrumb>
            <Breadcrumb.Item Link={DomLink} icon='bx-home' href='/' currentPath={path}>
              {t('general:utils.breadcrumb.home')}
            </Breadcrumb.Item>
            <Breadcrumb.Item Link={DomLink} href={getStaticRoute(i18n.language).invite.list} currentPath={path}>
              {t('breadcrumb.invites')}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t('breadcrumb.create')}</Breadcrumb.Item>
          </Breadcrumb>
          <form onSubmit={form.handleSubmit}>
            <FormSection className='bg-second'>
              <FormSection.Head>
                <FormSection.Head.Title>{t('form.title')}</FormSection.Head.Title>
                <FormSection.Head.Subtitle>{t('form.subtitle')}</FormSection.Head.Subtitle>
              </FormSection.Head>
              <FormSection.Body className='space-y-4'>
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
                    value={form.values.locale === 'tr'}
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
                    value={form.values.locale === 'en'}
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
              </FormSection.Body>
              <FormSection.Footer>
                <Button block={false} htmlType='submit' disabled={loading}>
                  {t(loading ? 'loading' : 'invite')}
                </Button>
              </FormSection.Footer>
            </FormSection>
          </form>
        </section>
      </MetaWrapper>
    </RoleGuardView>
  )
}

export { InviteCreateView as Component }
