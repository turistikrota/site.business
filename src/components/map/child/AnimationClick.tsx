import { useMapEvent } from 'react-leaflet'

export default function AnimationClick() {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return <> </>
}
