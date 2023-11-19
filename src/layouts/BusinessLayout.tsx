import { Component } from './BusinessDetailLayout'
import DefaultLayout from './DefaultLayout'

function BusinessLayout() {
  return (
    <DefaultLayout>
      <Component />
    </DefaultLayout>
  )
}

BusinessLayout.displayName = 'BusinessLayout'

export { BusinessLayout as Component }
