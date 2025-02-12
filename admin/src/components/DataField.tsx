import { Field } from '@strapi/design-system';
import { Calendar } from '@strapi/icons';
import { FormField } from './FormField';

export const DataField = ({
  label,
  value,
  type,
}: {
  label: string;
  value: string | number;
  type?: 'date';
}) => {
  const Icon = {
    date: Calendar,
    default: null,
  }[type ?? 'default'];

  return (
    <FormField name={''} label={label}>
      <Field.Input disabled startAction={Icon && <Icon />} value={value} />
    </FormField>
  );
};
