import DraggableMarker from '@/components/map/DraggableMarker.tsx'
import MapDefaultConfig from '@/components/map/MapDefaultConfig.tsx'
import MapDynamic from '@/components/map/MapDynamic.tsx'
import { findNearestDistrict } from '@/static/location/districts.ts'
import { ListingFormValues } from '@/types/listing.ts'
import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import LineForm from '@turistikrota/ui/form/line'
import FormSection from '@turistikrota/ui/form/section'
import Textarea from '@turistikrota/ui/form/textarea'
import ToggleButton from '@turistikrota/ui/form/toggle'
import { useToast } from '@turistikrota/ui/toast'
import { Coordinates } from '@turistikrota/ui/types'
import debounce from '@turistikrota/ui/utils/debounce'
import { FormikErrors } from 'formik'
import { LatLngTuple } from 'leaflet'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  values: ListingFormValues
  errors: FormikErrors<ListingFormValues>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setFieldValue: (field: string, value: any) => void
}

const defaultPosition: LatLngTuple = [41.0082, 28.9784]

const ListingFormLocationSection: React.FC<Props> = ({ values, errors, onChange, setFieldValue }) => {
  const [position, setPosition] = useState(defaultPosition)
  const [mapKey, setMapKey] = useState(0)
  const [grant, setGrant] = useState(false)
  const { t } = useTranslation('listings')
  const toast = useToast()

  const debouncedSync = debounce((position: Coordinates) => {
    const fixedPosition = position.map((p) => parseFloat(p.toFixed(6).replace(',', '.')))
    setFieldValue('location.coordinates', fixedPosition)
    const district = findNearestDistrict(position)
    if (!district) {
      setFieldValue('location.city', '')
      setFieldValue('location.street', '')
      return
    }
    setFieldValue('location.city', district.cityName)
    setFieldValue('location.street', district.name)
  }, 300)

  useEffect(() => {
    debouncedSync(position as Coordinates)
  }, [position])

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        getLocation()
        setGrant(true)
      }
    })
  }, [])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude])
          setMapKey((k) => k + 1)
          setGrant(true)
        },
        () => {
          toast.error(t('form.location.error'))
        },
      )
    } else {
      toast.error(t('form.location.notSupported'))
    }
  }

  return (
    <FormSection>
      <FormSection.Head>
        <FormSection.Head.Title>{t('form.location.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('form.location.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <FormSection.Body className='space-y-4 rounded-b-md md:space-y-4'>
        <Input
          id={`location.country`}
          type='text'
          name={`location.country`}
          readOnly
          disabled
          autoComplete={`location.country`}
          label={t('form.location.country')}
          ariaLabel={t('form.location.country')}
          value={values.location.country}
          error={errors.location?.country}
        />
        <Input
          id={`location.city`}
          type='text'
          name={`location.city`}
          autoComplete={`location.city`}
          label={t('form.location.city')}
          ariaLabel={t('form.location.city')}
          value={values.location.city}
          error={errors.location?.city}
          onChange={onChange}
          onBlur={onChange}
        />
        <Input
          id={`location.street`}
          type='text'
          name={`location.street`}
          autoComplete={`location.street`}
          label={t('form.location.street')}
          ariaLabel={t('form.location.street')}
          value={values.location.street}
          error={errors.location?.street}
          onChange={onChange}
          onBlur={onChange}
        />
        <div className='grid w-full grid-cols-12 gap-4'>
          <div className='col-span-6'>
            <Input
              id={`location.coordinates[0]`}
              type='number'
              name={`location.coordinates[0]`}
              autoComplete={`location.coordinates[0]`}
              label={t('form.location.latitude')}
              ariaLabel={t('form.location.latitude')}
              value={values.location.coordinates[0]}
              error={errors.location?.coordinates?.[0]}
              max={90}
              min={-90}
              step='0.000001'
              onChange={onChange}
              onBlur={onChange}
            />
          </div>
          <div className='col-span-6'>
            <Input
              id={`location.coordinates[1]`}
              type='number'
              name={`location.coordinates[1]`}
              autoComplete={`location.coordinates[1]`}
              label={t('form.location.longitude')}
              ariaLabel={t('form.location.longitude')}
              value={values.location.coordinates[1]}
              error={errors.location?.coordinates?.[1]}
              max={180}
              min={-180}
              step='0.000001'
              onChange={onChange}
              onBlur={onChange}
            />
          </div>
        </div>
        <Textarea
          id={`location.address`}
          name={`location.address`}
          autoComplete={`location.address`}
          label={t('form.location.address')}
          ariaLabel={t('form.location.address')}
          value={values.location.address}
          error={errors.location?.address}
          onChange={onChange}
          onBlur={onChange}
          rows={3}
        />
        <LineForm className='col-span-12'>
          <LineForm.Left>
            <LineForm.Left.Description>{t('form.location.isStrict.description')}</LineForm.Left.Description>
          </LineForm.Left>
          <LineForm.Right>
            <ToggleButton
              defaultChecked={values.validation.onlyFamily}
              variant='success'
              title={t('form.location.isStrict.title')}
              onChange={(e) => setFieldValue('location.isStrict', e)}
              size='sm'
            />
          </LineForm.Right>
        </LineForm>
        <Alert showIcon type='info'>
          <Alert.Title>{t('form.location.info.title')}</Alert.Title>
          <Alert.Description>
            {t('form.location.info.description')} <br />
            {t('form.location.info.descriptionTwo')}
          </Alert.Description>
        </Alert>
        <div className='!z-1 relative h-80 md:h-144'>
          <MapDynamic position={position} key={mapKey}>
            <MapDefaultConfig />
            <DraggableMarker position={position} setPosition={setPosition} />
          </MapDynamic>
          {!grant && (
            <div className='absolute inset-0 z-5000 flex h-full w-full items-center justify-center bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-80'>
              <Button onClick={getLocation} variant='success' size='lg' block={false}>
                {t('form.location.grant')}
              </Button>
            </div>
          )}
        </div>
      </FormSection.Body>
    </FormSection>
  )
}

export default ListingFormLocationSection
