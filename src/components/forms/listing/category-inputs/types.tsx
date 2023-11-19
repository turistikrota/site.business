import { CategoryInput, InputTranslation } from '@/api/category/category.api'

type RenderProps = {
  formName: string
  isDesktop: boolean
  value: any
  error?: string
  translator: (key: string) => string
  translation: InputTranslation
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  setFieldValue: (field: string, value: any) => void
}

export type InputRender = React.FC<CategoryInput & RenderProps>
