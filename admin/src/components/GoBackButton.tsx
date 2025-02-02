import { Link } from '@strapi/design-system';
import { ArrowLeft } from '@strapi/icons';
import React from 'react';

type Props = {};

export const GoBackButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Link onClick={() => window.history.back()} startIcon={<ArrowLeft />}>
      Go back
    </Link>
  );
};
