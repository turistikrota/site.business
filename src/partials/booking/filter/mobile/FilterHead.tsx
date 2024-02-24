import { useTranslation } from 'react-i18next'

type Props = {
  title: string
  closeable?: boolean
  clearable?: boolean
  resultCount: number
  onClose: () => void
  onClearAll: () => void
}

type FilterComponent = React.FC<Props> & {
  TitleSection: typeof FilterTitleSection
  Title: typeof FilterTitle
}

const FilterTitleSection: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className='flex items-center justify-between'>{children}</div>
}
const FilterTitle: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <span className='text-2xl font-semibold'>{children}</span>
}

const FilterHead: FilterComponent = ({ title, resultCount, closeable = false, onClose }) => {
  const { t } = useTranslation('common')
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          {closeable && (
            <span
              className='mr-3 flex h-full items-center text-gray-600 dark:text-gray-300'
              onClick={onClose}
              role='button'
              title={t('ux.button.close')}
              aria-label={t('ux.button.close')}
            >
              <i className='bx bx-sm bx-arrow-back'></i>
            </span>
          )}
          <span className='text-2xl font-semibold'>{title}</span>
        </div>
      </div>
      {!closeable && (
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {resultCount} {t('ux.label.result')}
        </span>
      )}
    </>
  )
}

FilterHead.TitleSection = FilterTitleSection
FilterHead.Title = FilterTitle

export default FilterHead
