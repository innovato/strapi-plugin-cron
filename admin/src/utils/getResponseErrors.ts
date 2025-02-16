export const getResponseErrors = (response: any) => {
  const errors: Record<string, string> = {};
  response.data.error.details.errors.map((error: any) => {
    const attrName = error.path[0];
    errors[attrName] = error.message;
  });
  return errors;
};
