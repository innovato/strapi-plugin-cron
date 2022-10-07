export const validate = (data, validationRules) => {
  const errors = [];
  for (const [attribute, value] of Object.entries(data)) {
    validationRules[attribute]?.some((validation) => {
      const error = validation(value);
      if (error) {
        errors.push({
          path: [attribute],
          message: error,
        });
        return true;
      }
    });
  }
  return errors.length ? errors : null;
};

export const isRequired = (value) => {
  if (!value) {
    return "This vaule is required";
  }
};

export const minValue = (minValue: number) => {
  return (value) => {
    if (value < minValue) {
      return `This value must be greater than or equal to ${minValue}`;
    }
  };
};
