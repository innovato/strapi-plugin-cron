export const getReadableDate = (date: string | null) => {
  if (!date) return "";
  return new Date(date).toDateString();
};

export const getCurrentDate = () => {
  return new Date().toLocaleString().split(",")[0];
};
