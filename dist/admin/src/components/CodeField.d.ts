type Props = {
    value: string;
    onValueChange: (value: string) => void;
    variant?: 'plaintext' | 'javascript';
    disabled?: boolean;
};
export declare const CodeField: ({ disabled, value, onValueChange, variant }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
