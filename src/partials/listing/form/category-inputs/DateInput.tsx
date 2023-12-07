import {useDayJS} from '@/utils/dayjs.ts'
import Input from '@turistikrota/ui/form/input'
import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {InputRender} from './types.tsx'

const CategoryDateInput: InputRender = ({formName, translation, value, error, onChange, extra}) => {
    const {i18n} = useTranslation()
    const dayjs = useDayJS(i18n.language)
    const [min, max] = useMemo(() => {
        if (!extra) return [undefined, undefined]
        const min = extra.find((e) => e.name === 'min')?.value
        const max = extra.find((e) => e.name === 'max')?.value
        const minday = min ? dayjs(min) : undefined
        const maxday = max ? dayjs(max) : undefined
        return [minday?.format('YYYY-MM-DD'), maxday?.format('YYYY-MM-DD')]
    }, [extra])
    return (
        <div className='col-span-12 sm:col-span-6'>
            <Input
                id={formName}
                type='date'
                name={formName}
                autoComplete={formName}
                label={translation.name}
                ariaLabel={translation.name}
                value={value}
                error={error}
                min={min}
                max={max}
                onChange={onChange}
                onBlur={onChange}
            />
        </div>
    )
}

export default CategoryDateInput
