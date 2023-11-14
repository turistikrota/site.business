import { ScaleControl } from 'react-leaflet'
import AnimationClick from './child/AnimationClick'
import DefaultTileLayer from './child/DefaultTileLayer'

export default function MapDefaultConfig() {
  return (
    <>
      <AnimationClick />
      <DefaultTileLayer />
      <ScaleControl />
    </>
  )
}
