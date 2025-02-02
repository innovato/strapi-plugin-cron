export const getResponseErrors = (response: any) => {
  const errors = {};
  response.data.error.details.errors.map((error: any) => {
    const attrName = error.path[0];
    // TODO
    // @ts-ignore
    errors[attrName] = error.message;
  });
  return errors;
};
