import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { OwnerDetailContext } from './OwnerMenuLayout'

export default function ToggleButton() {
  const menuContext = useContext(OwnerDetailContext)
  const { t } = useTranslation('detail')
  return (
    <button
      className='flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
      title={t('buttons.toggle')}
      aria-label={t('buttons.toggle')}
      onClick={() => menuContext.setOpenMenu(!menuContext.openMenu)}
    >
      <i className='bx bx-menu text-3xl'></i>
    </button>
  )
}
