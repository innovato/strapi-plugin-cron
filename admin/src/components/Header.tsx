import { Button, Typography } from '@strapi/design-system';

interface HeaderProps {
  title: string;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  primaryAction?: React.ReactNode;
}

export const Header = ({ title, as, primaryAction }: HeaderProps) => {
  return (
    <div>
      <Typography
        as={as}
        variant="beta"
        style={{ color: 'white' }}
        fontWeight="bold"
        fontSize="20px"
        lineHeight="28px"
      >
        {title}
      </Typography>
      <Button>{primaryAction}</Button>
    </div>
  );
};
