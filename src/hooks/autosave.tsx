import debounce from '@turistikrota/ui/utils/debounce'

type AutoSaveHook<T> = {
  set: (value: T) => void
  get: () => T | undefined
  remove: () => void
}

export default function useAutoSave<T = any>(key: string, onSave?: () => void): AutoSaveHook<T> {
  const debouncedSetter = debounce((value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
    onSave?.()
  }, 300)

  const set = (value: T) => {
    debouncedSetter(value)
  }

  const get = () => {
    try {
      const item = localStorage.getItem(key)
      if (!item) return undefined
      return JSON.parse(item) as T
    } catch {
      return undefined
    }
  }

  const remove = () => {
    localStorage.removeItem(key)
  }

  return {
    set,
    get,
    remove,
  }
}
