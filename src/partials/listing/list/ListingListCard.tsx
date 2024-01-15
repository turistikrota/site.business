import { ListingImage, ListingLocation, ListingTranslation } from '@/api/listing/listing.api.ts'
import { getStaticRoute } from '@/static/page.ts'
import { getI18nTranslation } from '@/types/base.ts'
import { useDayJS } from '@/utils/dayjs.ts'
import Badge from '@turistikrota/ui/badge'
import Button from '@turistikrota/ui/button'
import Carousel from '@turistikrota/ui/carousel'
import Tooltip, { TooltipProvider } from '@turistikrota/ui/tooltip'
import { FullVariant, I18nTranslation } from '@turistikrota/ui/types'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export type Props = {
  uuid: string
  images: ListingImage[]
  location: ListingLocation
  meta: I18nTranslation<ListingTranslation>
  isActive: boolean
  isDeleted: boolean
  isValid: boolean
  isDraggable: boolean
  createdAt: string
}

type StateItemProps = {
  variant: FullVariant
  title: string
  description: string
  className?: string
}

const StateItem: React.FC<StateItemProps> = ({ variant, title, description, className }) => {
  return (
    <div className={`${className ? className : 'col-span-6 justify-center'}`}>
      <Tooltip position='top' className='w-full' innerClassName='w-full' content={<span>{description}</span>}>
        <Badge variant={variant} className='w-full justify-center'>
          {title}
        </Badge>
      </Tooltip>
    </div>
  )
}

const ListingListCard: React.FC<Props> = ({
  uuid,
  createdAt,
  images,
  isActive,
  isDeleted,
  isValid,
  isDraggable,
  location,
  meta,
}) => {
  const { t, i18n } = useTranslation('listings')
  const dayjs = useDayJS(i18n.language)
  const translation = useMemo<ListingTranslation>(() => {
    return getI18nTranslation(meta, i18n.language)
  }, [meta, i18n.language])

  const mappedImages = useMemo<string[]>(
    () => images.sort((a, b) => a.order - b.order).map((image) => image.url),
    [images],
  )

  return (
    <div className={`flex h-full flex-col ${isDraggable ? 'cursor-move' : 'w-full'}`}>
      <Carousel imageAltPrefix={translation.title} images={mappedImages} variant={Carousel.Variants.List} />
      <TooltipProvider>
        <div className='flex h-full flex-col justify-between gap-2 p-2'>
          <div className='flex flex-col gap-2'>
            <div className='line-clamp-2 text-xl font-bold'>{translation.title}</div>
            <div className='flex w-full items-center justify-between text-sm'>
              <span>
                {location.city}, {location.street}
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-12 items-center justify-between gap-2'>
              {!isActive && (
                <StateItem
                  variant='danger'
                  title={t('details.states.passive.title')}
                  description={t('details.states.passive.description')}
                />
              )}
              {isActive && (
                <StateItem
                  variant='success'
                  title={t('details.states.active.title')}
                  description={t('details.states.active.description')}
                />
              )}
              {isDeleted && (
                <StateItem
                  variant='danger'
                  title={t('details.states.deleted.title')}
                  description={t('details.states.deleted.description')}
                />
              )}
              {!isValid && (
                <StateItem
                  variant='warning'
                  title={t('details.states.verificationFailed.title')}
                  description={t('details.states.verificationFailed.description')}
                />
              )}
              {isValid && isActive && !isDeleted && (
                <StateItem
                  variant='danger'
                  title={t('details.states.onLive.title')}
                  description={t('details.states.onLive.description')}
                />
              )}
              <Link
                to={getStaticRoute(i18n.language).business.details.listing.detail + uuid}
                target='_blank'
                className='col-span-12'
              >
                <Button variant='primary' className='flex items-center justify-center gap-2'>
                  <i className='bx bx-sm bx-detail'></i>
                  {t('details.actions.show-details')}
                </Button>
              </Link>
            </div>
            <div className='w-full text-sm text-gray-600 dark:text-gray-300'>
              {t('details.fields.createdAt', {
                date: dayjs(createdAt).format('DD MMM YYYY HH:mm'),
              })}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}

export default ListingListCard
