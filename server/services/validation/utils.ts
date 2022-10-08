export const validate = (data, validationRules) => {
  const errors = [];
  for (const [attribute, value] of Object.entries(data)) {
    validationRules[attribute]?.some((validation) => {
      const error = validation(value, data);
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

export const futureDate = (value) => {
  if (value === null) {
    return;
  }
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (new Date(value) < now) {
    return "This date must be in the future";
  }
};
