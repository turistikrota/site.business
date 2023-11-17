import { Coordinates } from '@turistikrota/ui/types'
import districts from './tr-districts.json'

export type District = (typeof districts)[0]

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180)
}

const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371 // Yeryüzü ortalama yarıçapı (km)
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

export const findNearestDistrict = (coordinates: Coordinates): District | null => {
  let nearestDistrict = null
  let minDistance = Number.MAX_VALUE

  for (const district of districts) {
    const distance = getDistanceFromLatLonInKm(
      coordinates[0],
      coordinates[1],
      district.coordinates[0],
      district.coordinates[1],
    )
    if (distance < minDistance) {
      minDistance = distance
      nearestDistrict = district
    }
  }
  return nearestDistrict
}
