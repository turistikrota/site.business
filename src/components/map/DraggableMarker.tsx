import { LatLngTuple, Marker as MarkerType } from 'leaflet'
import React, { useMemo, useRef } from 'react'
import { Marker } from 'react-leaflet'

type Props = {
  position: LatLngTuple
  setPosition: (position: LatLngTuple) => void
}

const DraggableMarker: React.FC<Props> = ({ position, setPosition }) => {
  const markerRef = useRef<MarkerType>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const lt = marker.getLatLng()
          setPosition([lt.lat, lt.lng])
        }
      },
    }),
    [],
  )
  return <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef} />
}

export default DraggableMarker
