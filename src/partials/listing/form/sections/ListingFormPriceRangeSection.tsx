import {Prices} from '@/types/listing.ts'
import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import ErrorText from '@turistikrota/ui/text/error'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'

type Props = {
    prices: Prices
    onAdd: (from: string, to: string, price: number) => void
}

const ListingFormPriceRangeSection: React.FC<Props> = ({onAdd, prices}) => {
    const [startDate, setStartDate] = useState<string | undefined>(undefined)
    const [endDate, setEndDate] = useState<string | undefined>(undefined)
    const [price, setPrice] = useState<string>('')
    const [error, setError] = useState<string | undefined>(undefined)
    const {t} = useTranslation('listings')

    const fixPrice = (p: string): [number, boolean] => {
        let str = p
        if (str.includes('.')) {
            str = str.replace('.', '')
        }
        if (str.includes(',')) {
            str = str.replace(',', '.')
        }
        const arr = new Float64Array([parseFloat(str)])
        return [arr[0], !Number.isNaN(arr[0])]
    }

    const ruleDate = (): boolean => {
        if (!startDate || !endDate) return false
        const start = new Date(startDate)
        const end = new Date(endDate)
        if (start > end) {
            setError(t('form.calendar.error.startDateGreaterThanEndDate'))
            return true
        }
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        if (start.getTime() < now.getTime()) {
            setError(t('form.calendar.error.startDateLessThanNow'))
            return true
        }
        if (end < now) {
            setError(t('form.calendar.error.endDateLessThanNow'))
            return true
        }
        setError(undefined)
        return false
    }

    const ruleUnique = (): boolean => {
        if (!startDate || !endDate) return false
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        const end = new Date(endDate)
        end.setHours(0, 0, 0, 0)
        let isUnique = true
        prices.forEach((price) => {
            const s = new Date(price.startDate)
            s.setHours(0, 0, 0, 0)
            const e = new Date(price.endDate)
            e.setHours(0, 0, 0, 0)
            if (start >= s && start <= e) {
                isUnique = false
            }
            if (end >= s && end <= e) {
                isUnique = false
            }
        })
        if (!isUnique) {
            setError(t('form.calendar.error.unique'))
            return true
        }
        setError(undefined)
        return false
    }

    const rulePrice = (): boolean => {
        if (!price) return false
        const [p, valid] = fixPrice(price)
        if (!valid) {
            setError(t('form.calendar.error.priceNaN'))
            return true
        }
        if (p < 0) {
            setError(t('form.calendar.error.priceNegative'))
            return true
        }
        setError(undefined)
        return false
    }

    const validateLogic = (): boolean => {
        if (ruleDate()) return true
        if (ruleUnique()) return true
        if (rulePrice()) return true
        return false
    }

    const add = () => {
        if (startDate && endDate && price && !validateLogic()) {
            const [p] = fixPrice(price)
            onAdd(startDate, endDate, p)
            setStartDate('')
            setEndDate('')
            setPrice('')
        }
    }

    return (
        <>
            <div className='flex w-full gap-x-4'>
                <div className='w-full'>
                    <Input
                        id='startDate'
                        name='startDate'
                        type='date'
                        min={new Date().toISOString().split('T')[0]}
                        max={endDate}
                        autoComplete='start-date'
                        label={t('form.calendar.startDate')}
                        ariaLabel={t('form.calendar.startDate')}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <i className='bx bx-arrow-to-right text-2xl text-gray-700 dark:text-gray-300'/>
                </div>
                <div className='w-full'>
                    <Input
                        id='endDate'
                        name='endDate'
                        type='date'
                        min={startDate}
                        autoComplete='end-date'
                        label={t('form.calendar.endDate')}
                        ariaLabel={t('form.calendar.endDate')}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <Input
                id='price'
                name='price'
                autoComplete='price'
                label={t('form.calendar.price')}
                ariaLabel={t('form.calendar.price')}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <ErrorText>{error}</ErrorText>
            <Button onClick={add}>{t('form.calendar.add')}</Button>
        </>
    )
}

export default ListingFormPriceRangeSection
