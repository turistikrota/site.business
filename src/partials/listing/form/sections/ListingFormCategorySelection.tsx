import {
  CategoryListItem,
  CategoryMeta,
  fetchChildCategories,
  fetchMainCategories,
} from '@/api/category/category.api.ts'
import RichSelection from '@/components/selection/RichSelection.tsx'
import { getI18nTranslation } from '@/types/base.ts'
import ErrorText from '@turistikrota/ui/text/error'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin'

type Props = {
  selectedCategories: string[]
  initialSelectedCategories?: string[]
  setSelectedCategories: (categories: string[]) => void
  error?: React.ReactNode
}

type CategoryState = CategoryListItem & {
  selected: boolean
}

type CategoryList = CategoryState[]

const ListingFormCategorySelection: React.FC<Props> = ({
  initialSelectedCategories,
  selectedCategories,
  setSelectedCategories,
  error,
}) => {
  const { i18n } = useTranslation('listings')
  const [allCategories, setAllCategories] = useState<CategoryList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMainCategories().then((res) => {
      setAllCategories([res.map((r) => ({ ...r, selected: false }))])
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (initialSelectedCategories && initialSelectedCategories.length > 0) {
      syncCategories(initialSelectedCategories)
    }
  }, [initialSelectedCategories])

  const syncCategories = async (initialSelectedCategories: string[]) => {
    if (!initialSelectedCategories || initialSelectedCategories.length === 0 || allCategories.length === 0) {
      return
    }
    setLoading(true)
    const promises = initialSelectedCategories.map((c) => fetchChildCategories(c))
    const responses = await Promise.all(promises)
    const _allCategories: CategoryList[] = []
    if (allCategories.length > 0) {
      _allCategories.push(allCategories[0]) // main categories
    }
    responses.forEach((r) => {
      if (r.length > 0) {
        _allCategories.push(r.map((c) => ({ ...c, selected: false })))
      }
    })
    setAllCategories(_allCategories)
    setSelectedCategories(initialSelectedCategories)
    setLoading(false)
  }

  const getChildCategories = (parentId: string, parentIdx: number) => {
    setLoading(true)
    const clearedNextCategories = allCategories.slice(0, parentIdx + 1)
    const clearedSelectedCategories = selectedCategories.slice(0, parentIdx)
    fetchChildCategories(parentId).then((res) => {
      clearedSelectedCategories.push(parentId)
      setSelectedCategories(clearedSelectedCategories)

      if (res.length > 0) {
        clearedNextCategories.push(res.map((r) => ({ ...r, selected: false })))
      }
      setAllCategories(clearedNextCategories)
      setLoading(false)
    })
  }

  return (
    <Spin loading={loading}>
      <div className='flex flex-col gap-y-2'>
        {allCategories.map((categoryList, idx) => (
          <RichSelection
            key={idx}
            items={categoryList.map((c) => ({
              id: c.uuid,
              image: c.images[0]!.url,
              name: getI18nTranslation<CategoryMeta>(c.meta, i18n.language).name,
            }))}
            selected={selectedCategories[idx]}
            onSelect={(id) => {
              getChildCategories(id, idx)
            }}
          />
        ))}
        <ErrorText>{error}</ErrorText>
      </div>
    </Spin>
  )
}

export default ListingFormCategorySelection
