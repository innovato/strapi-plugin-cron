import { Box, Flex, Link, Main, Typography } from '@strapi/design-system';
import { ChevronLeft } from '@strapi/icons';
import { ReactNode } from 'react';
import { PLUGIN_ID } from '../../../utils/plugin';

export const PageLayout = ({ children, title }: { children: ReactNode; title: string }) => {
  const isNotHomePage = !window.location.pathname.endsWith(`${PLUGIN_ID}`);

  return (
    <Main>
      <Box padding={8}>
        <Flex marginBottom={8} gap={2} alignItems="center">
          {isNotHomePage && <GoBackButton />}
          <Typography variant="alpha">{title}</Typography>
        </Flex>
        {children}
      </Box>
    </Main>
  );
};

const GoBackButton: React.FunctionComponent = (props) => {
  return (
    <Link
      onClick={() => window.history.back()}
      startIcon={<ChevronLeft width="26px" height="26px" />}
    ></Link>
  );
};
