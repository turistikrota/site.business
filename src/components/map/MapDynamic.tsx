import { Coordinates } from '@turistikrota/ui/types'
import { Map, type LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { useCallback, useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'

type Props = {
  position: LatLngTuple
  zoom?: number
  className?: string
  onChange?: (coordinates: Coordinates, zoom: number) => void
}

export default function MapDynamic({
  children,
  position,
  zoom = 10,
  onChange,
  className,
}: React.PropsWithChildren<Props>) {
  const [map, setMap] = useState<Map | null>(null)

  const onMove = useCallback(() => {
    if (map) {
      const center = map.getCenter()
      const zoom = map.getZoom()
      if (onChange) {
        onChange([center.lat, center.lng], zoom)
      }
    }
  }, [map])

  useEffect(() => {
    if (!map) return
    map.on('move', onMove)
    return () => {
      if (!map) return
      map.off('move', onMove)
    }
  }, [map, onMove])

  useEffect(() => {}, [])

  return (
    <MapContainer
      minZoom={7}
      maxZoom={15}
      ref={setMap}
      center={position}
      zoom={zoom}
      className={`h-full w-full min-h-full ${className}`}
    >
      {children}
    </MapContainer>
  )
}
