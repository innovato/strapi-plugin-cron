import { Box } from '@strapi/design-system';
import { ReactNode } from 'react';

export const ContentBlock = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      padding={8}
      marginBottom={8}
      borderStyle={'solid'}
      borderWidth={'1px'}
      borderColor={'neutral150'}
      borderRadius={'4px'}
      shadow="tableShadow"
      background="neutral0"
    >
      {children}
    </Box>
  );
};
