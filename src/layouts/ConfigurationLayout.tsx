import MetaWrapper from '@/components/MetaWrapper'
import CubeEffect from '@turistikrota/ui/design/cube'
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
        <div className='mx-auto flex h-full flex-col items-center justify-center px-4 lg:py-0'>
          <Link to={`https://turistikrota.com/${i18n.language}`} target='_blank' className='mb-6 flex items-center'>
            <Logo />
          </Link>
          <CubeEffect.All />
          <div className='w-full rounded-md bg-second shadow-sm transition-shadow duration-200 hover:shadow-md sm:max-w-md md:mt-0 xl:p-0'>
            {children}
          </div>
        </div>
      </section>
    </MetaWrapper>
  )
}
