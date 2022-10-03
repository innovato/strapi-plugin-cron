export const getResponseErrors = (response: any) => {
  const errors = {};
  response.data.error.details.errors.map((error) => {
    const attrName = error.path[0];
    errors[attrName] = error.message;
  });
  return errors;
};
