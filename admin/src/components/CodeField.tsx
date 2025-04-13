import { Box, Textarea } from '@strapi/design-system';
import { Grammar, languages } from 'prismjs';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  variant?: 'plaintext' | 'javascript';
  disabled?: boolean;
};

export const CodeField = ({ disabled, value, onValueChange, variant = 'plaintext' }: Props) => {
  const [grammar, language] = {
    plaintext: [languages.markup, 'plaintext'],
    javascript: [languages.javascript, 'js'],
  }[variant] as [Grammar, string];

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
      {/* {disabled && (
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          background="rgba(50, 50, 77, .5)"
        />
      )} */}
    </Box>
  );
};
