import ProfileMenuItem from '@/components/ProfileMenuItem'
import LogoutMenuItem from '@/partials/auth/LogoutMenuItem'
import { AllItems } from '@/partials/menu/menu.items'
import ProfileMenuCard from '@/partials/profile/ProfileMenuCard'
import { getStaticRoute } from '@/static/page'
import Button from '@turistikrota/ui/button'
import Modal from '@turistikrota/ui/modal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function BusinessMobileMenu() {
  const { t, i18n } = useTranslation('general')
  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsActive(!isActive)}
        block={false}
        variant='secondary'
        className='fixed bottom-4 left-1/2 z-9999 flex h-14 w-14 -translate-x-1/2 transform items-center justify-center !rounded-full text-white'
      >
        <i className='bx bx-menu text-4xl' />
      </Button>
      <div
        className={`z-9998 fixed bottom-0 left-0 h-screen w-full transform overflow-y-scroll bg-zinc-950 bg-opacity-80 pb-20 backdrop-blur-sm transition-transform duration-300 ${
          isActive ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Modal.Head.CloseButton onClose={() => setIsActive(false)} />
        <section className='flex flex-col items-center p-4 pt-14'>
          <ProfileMenuCard />
          <div className='mt-2 grid w-full gap-2'>
            {AllItems.map((el, i) => (
              <ProfileMenuItem
                key={i}
                isLink={!!el.href}
                title={t(`sections.menu.${el.title}`)}
                aria-label={t(`sections.menu.${el.title}`)}
                href={el.href(getStaticRoute(i18n.language))}
                onClick={() => setIsActive(false)}
              >
                <ProfileMenuItem.IconWrapper open={false}>
                  <ProfileMenuItem.Icon icon={el.icon} />
                </ProfileMenuItem.IconWrapper>
                <ProfileMenuItem.Content isLink={!!el.href} hidden={false}>
                  {t(`sections.menu.${el.title}`)}
                </ProfileMenuItem.Content>
              </ProfileMenuItem>
            ))}
            <LogoutMenuItem hideContent={false} />
          </div>
        </section>
      </div>
    </>
  )
}
