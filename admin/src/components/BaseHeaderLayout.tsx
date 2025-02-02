import { Box, Typography } from '@strapi/design-system';

interface HeaderProps {
  title: string;
  primaryAction?: React.ReactNode;
  navigationAction?: React.ReactNode;
}

export const BaseHeaderLayout = ({ title, primaryAction, navigationAction }: HeaderProps) => {
  return (
    <Box paddingLeft={8} paddingTop={8}>
      <Typography
        variant="beta"
        style={{ color: 'white' }}
        fontWeight="bold"
        fontSize="20px"
        lineHeight="28px"
      >
        {title}
      </Typography>
      {/* {primaryAction && <Button>{primaryAction}</Button>}
      {navigationAction && <Button>{navigationAction}</Button>} */}
    </Box>
  );
};
