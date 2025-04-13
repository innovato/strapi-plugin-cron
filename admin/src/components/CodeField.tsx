import { Box } from '@strapi/design-system';
import { Grammar, highlight, languages } from 'prismjs';
import 'prismjs/themes/prism.css';
import { default as Editor } from 'react-simple-code-editor';

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
      <Editor
        value={value}
        onValueChange={(value) => {
          if (disabled) return;
          onValueChange(value);
        }}
        highlight={(code) => highlight(code, grammar, language)}
        padding={10}
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: 14,
          border: '1px solid #cccccc50',
          borderRadius: 4,
          backgroundColor: '#1e1e1e',
        }}
      />
      {disabled && (
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          background="rgba(50, 50, 77, .5)"
        />
      )}
    </Box>
  );
};
