import { EmptyStateLayout } from '@strapi/design-system';
import { EmptyDocuments } from '@strapi/icons/symbols';
import React from 'react';
import { PageLayout } from './PageLayout';

export const NotFound: React.FunctionComponent = () => {
  return (
    <PageLayout title="Page not found">
      <EmptyStateLayout
        icon={<EmptyDocuments style={{ width: '200px', height: '200px' }} />}
        content="Oops! We can't seem to find the page you're looking for..."
      />
    </PageLayout>
  );
};
