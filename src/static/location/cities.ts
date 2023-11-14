import { Coordinates } from '@turistikrota/ui/types'
import { turkishSorting } from '@turistikrota/ui/utils/sort'
import cities from './tr-city-names.json'

export type City = (typeof cities)[0]

export default cities.sort((a, b) => turkishSorting(a.name, b.name))

export const findCityByName = (name: string): City | null => {
  const city = cities.find((city) => city.name === name)
  return city || null
}

export const findCityByCoordinates = (coordinates: Coordinates): City | null => {
  const city = cities.find((city) => city.coordinates[0] === coordinates[0] && city.coordinates[1] === coordinates[1])
  if (city) return city
  return null
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

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180)
}

export const findNearestCity = (coordinates: Coordinates): City | null => {
  let nearestCity = null
  let minDistance = Number.MAX_VALUE

  for (const city of cities) {
    const distance = getDistanceFromLatLonInKm(coordinates[0], coordinates[1], city.coordinates[0], city.coordinates[1])
    if (distance < minDistance) {
      minDistance = distance
      nearestCity = city
    }
  }
  return nearestCity
}

export const findNearestDistrict = (coordinates: Coordinates, city: City): string | null => {
  let nearestDistrict = null
  let minDistance = Number.MAX_VALUE

  for (const district of city.districts) {
    const distance = getDistanceFromLatLonInKm(
      coordinates[0],
      coordinates[1],
      district.coordinates[0],
      district.coordinates[1],
    )
    if (distance < minDistance) {
      minDistance = distance
      nearestDistrict = district.name
    }
  }
  return nearestDistrict
}

export const findBestNearestCities = (coordinates: Coordinates, count: number): City[] => {
  let nearestCities = []
  let minDistance = Number.MAX_VALUE

  for (const city of cities) {
    const distance = getDistanceFromLatLonInKm(coordinates[0], coordinates[1], city.coordinates[0], city.coordinates[1])
    if (distance < minDistance) {
      minDistance = distance
      nearestCities.push(city)
    }
  }
  nearestCities = nearestCities.sort((a, b) => {
    const distanceA = getDistanceFromLatLonInKm(coordinates[0], coordinates[1], a.coordinates[0], a.coordinates[1])
    const distanceB = getDistanceFromLatLonInKm(coordinates[0], coordinates[1], b.coordinates[0], b.coordinates[1])
    return distanceA - distanceB
  })
  return nearestCities.slice(0, count)
}

export const findNearestCityAndDistrict = (coordinates: Coordinates): { city: City; district: string } | null => {
  const nearestCity = findNearestCity(coordinates)
  if (!nearestCity) return null
  const nearestDistrict = findNearestDistrict(coordinates, nearestCity)
  if (!nearestDistrict) return null
  return { city: nearestCity, district: nearestDistrict }
}
