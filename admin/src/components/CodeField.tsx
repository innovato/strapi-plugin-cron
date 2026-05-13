import { Box, Textarea } from '@strapi/design-system';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

export const CodeField = ({ disabled, value, onValueChange }: Props) => {
  return (
    <Box position="relative">
      <Textarea
        placeholder="This is a content placeholder"
        name="content"
        value={value}
        onChange={(value: string) => {
          if (disabled) return;
          onValueChange(value);
        }}
        disabled
      />
    </Box>
  );
};
