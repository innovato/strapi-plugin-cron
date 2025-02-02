import { Box } from '@strapi/design-system';
import { ReactNode } from 'react';

export const ContentLayout = ({ children }: { children: ReactNode }) => {
  return <Box padding={8}>{children}</Box>;
};
