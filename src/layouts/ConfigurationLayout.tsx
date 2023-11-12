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
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0'>
          <Link to={`https://turistikrota.com/${i18n.language}`} target='_blank' className='flex items-center mb-6'>
            <Logo />
          </Link>
          <div className='w-full bg-second shadow-lg rounded-lg md:mt-0 sm:max-w-md xl:p-0'>{children}</div>
        </div>
      </section>
    </MetaWrapper>
  )
}
