import Input from '@turistikrota/ui/form/input'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type Item = {
  image: string
  name: string
  id: string
}

type Props = {
  items: Item[]
  selected: string
  onSelect: (id: string) => void
}

type ItemProps = {
  image: string
  name: string
  selected: boolean
  onClick: () => void
}

const RichSelection: React.FC<Props> = ({ items, selected, onSelect }) => {
  const [query, setQuery] = useState<string | undefined>(undefined)
  const { t } = useTranslation('general')
  const isDesktop = useIsDesktop()

  const filteredItems = useMemo(() => {
    if (!query) return items
    return items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
  }, [items, query])

  return (
    <div className='rounded-md bg-default py-2'>
      {items.length > 50 && (
        <div className='px-2'>
          <Input
            label={t('input.search')}
            name='search'
            size={isDesktop ? 'md' : undefined}
            suffix={<i className='bx bx-xs bx-search-alt-2'></i>}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      <div className={`grid max-h-40 grid-cols-12 gap-2 overflow-y-auto p-2`}>
        {filteredItems.map((item, idx) => (
          <RichSelectionItem
            key={idx}
            image={item.image}
            name={item.name}
            onClick={() => onSelect(item.id)}
            selected={selected === item.id}
          />
        ))}
      </div>
    </div>
  )
}

const RichSelectionItem: React.FC<ItemProps> = ({ image, name, selected, onClick }) => {
  return (
    <div
      className={`col-span-12 flex cursor-pointer items-center gap-2 rounded-md p-2 md:col-span-4 ${
        selected ? 'bg-third' : 'bg-second'
      }`}
      onClick={onClick}
    >
      <div className='flex items-center justify-center'>
        <img src={image} alt={name} className='min-w-10 h-10 w-10 max-w-min rounded-md object-cover' />
      </div>
      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>{name}</span>
          {selected && (
            <div className='flex items-center justify-center'>
              <i className={`bx bx-sm bx-check text-xl text-primary`} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RichSelection
