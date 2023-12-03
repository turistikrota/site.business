import MapDefaultConfig from '@/components/map/MapDefaultConfig.tsx'
import MapDynamic from '@/components/map/MapDynamic.tsx'
import { Coordinates } from '@turistikrota/ui/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Marker } from 'react-leaflet'

type Props = {
  coordinates: Coordinates
}

const ListingDetailMapSection: React.FC<Props> = ({ coordinates }) => {
  const { t } = useTranslation('listings')

  return (
    <section>
      <h2 className='mb-3 text-xl font-semibold'>{t('detail.sections.map')}</h2>
      <div className='h-80 md:h-144'>
        <MapDynamic position={coordinates}>
          <MapDefaultConfig />
          <Marker position={coordinates} />
        </MapDynamic>
      </div>
    </section>
  )
}

export default ListingDetailMapSection
