import { Box, Field } from '@strapi/design-system';
import { ReactNode } from 'react';

export const FormField = ({
  children,
  name,
  label,
  error,
  hint,
  width = '400px',
}: {
  children: ReactNode;
  name: string;
  label: string;
  error?: string | string[] | undefined;
  hint?: string;
  width?: string;
}) => (
  <Box width={width}>
    <Field.Root id={name} error={error} hint={hint} marginBottom={5}>
      <Field.Label>{label}</Field.Label>
      {children}
      <Field.Error />
      <Field.Hint />
    </Field.Root>
  </Box>
);
