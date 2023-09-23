import DefaultLayout from './DefaultLayout'
import { Component } from './OwnerDetailLayout'

function OwnerLayout() {
  return (
    <DefaultLayout>
      <Component />
    </DefaultLayout>
  )
}

OwnerLayout.displayName = 'OwnerLayout'

export { OwnerLayout as Component }
