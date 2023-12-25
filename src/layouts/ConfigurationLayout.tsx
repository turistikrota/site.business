import MetaWrapper from '@/components/MetaWrapper'
import Logo from '@turistikrota/ui/logo'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  description: string
  keywords: string
}

export default function ConfigurationLayout({
  children,
  title,
  description,
  keywords,
}: React.PropsWithChildren<Props>) {
  const { i18n } = useTranslation()

  return (
    <MetaWrapper title={title} description={description} keywords={keywords}>
      <section className='h-full'>
        <div className='mx-auto flex h-full flex-col items-center justify-center px-2 lg:py-0'>
          <Link to={`https://turistikrota.com/${i18n.language}`} target='_blank' className='mb-2 flex items-center'>
            <Logo />
          </Link>
          <div className='w-full rounded-md border sm:max-w-md md:mt-0 xl:p-0'>{children}</div>
        </div>
      </section>
    </MetaWrapper>
  )
}
