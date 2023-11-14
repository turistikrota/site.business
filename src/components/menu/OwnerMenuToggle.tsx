import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { OwnerDetailContext } from './OwnerMenuLayout'

export default function ToggleButton() {
  const menuContext = useContext(OwnerDetailContext)
  const { t } = useTranslation('menu')
  return (
    <button
      className='flex items-center justify-center text-gray-700 transition-colors duration-200 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white'
      title={t('buttons.toggle')}
      aria-label={t('buttons.toggle')}
      onClick={() => menuContext.setOpenMenu(!menuContext.openMenu)}
    >
      <i className='bx bx-menu text-3xl'></i>
    </button>
  )
}
