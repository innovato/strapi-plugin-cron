import React from 'react'

import { Link } from '@strapi/design-system'
import { ArrowLeft } from '@strapi/icons'

type Props = {}

export const GoBackButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Link onClick={() => window.history.back()} startIcon={<ArrowLeft />}>
      Go back
    </Link>
  )
}
