export const getReadableDate = (date: string | null) => {
  if (!date) {
    return "";
  }
  return new Date(date).toDateString();
};
