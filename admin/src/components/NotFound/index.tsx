import React from 'react'

import {
  EmptyStateLayout,
} from '@strapi/design-system'
import { EmptyDocuments } from '@strapi/icons'

export const NotFound: React.FunctionComponent = () => {
  return (
    <>
        <EmptyStateLayout
          icon={<EmptyDocuments style={{ width: '200px', height: '200px' }} />}
          content="Oops! We can't seem to find the page you're looking for..."
        />
    </>
  )
}
