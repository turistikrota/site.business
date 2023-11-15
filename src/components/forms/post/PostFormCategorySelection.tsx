import { CategoryListItem, CategoryMeta, fetchChildCategories, fetchMainCategories } from '@/api/category/category.api'
import RichSelection from '@/components/selection/RichSelection'
import { getI18nTranslation } from '@/types/base'
import ErrorText from '@turistikrota/ui/text/error'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Spin from 'sspin'

type Props = {
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  error?: React.ReactNode
}

type CategoryState = CategoryListItem & {
  selected: boolean
}

type CategoryList = CategoryState[]

const PostFormCategorySelection: React.FC<Props> = ({ selectedCategories, setSelectedCategories, error }) => {
  const { i18n } = useTranslation('posts')
  const [allCategories, setAllCategories] = useState<CategoryList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMainCategories().then((res) => {
      setAllCategories([res.map((r) => ({ ...r, selected: false }))])
      setLoading(false)
    })
  }, [])
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

export default PostFormCategorySelection
