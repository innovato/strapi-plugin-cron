import { EmptyStateLayout } from '@strapi/design-system';
import React from 'react';
import { BaseHeaderLayout } from '../components/BaseHeaderLayout';
import { ContentLayout } from '../components/ContentLayout';
import { EmptyDocuments } from '@strapi/icons/symbols';

export const NotFound: React.FunctionComponent = () => {
  return (
    <>
      <BaseHeaderLayout title="Page not found" />
      <ContentLayout>
        <EmptyStateLayout
          icon={<EmptyDocuments style={{ width: '200px', height: '200px' }} />}
          content="Oops! We can't seem to find the page you're looking for..."
        />
      </ContentLayout>
    </>
  );
};
