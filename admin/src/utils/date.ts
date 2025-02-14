const DAY_IN_MS = 86400000;

export const getDateString = (date: string | null) => {
  if (!date) return '—';
  return new Date(date).toDateString();
};

export const getDateAndTimeString = (date: string | null) => {
  if (!date) return '—';
  return new Date(date).toLocaleString('en-GB');
};

export const getCurrentDate = () => {
  return new Date().toLocaleString().split(',')[0];
};

export const getTomorrowDate = () => {
  return new Date(Date.now() + DAY_IN_MS);
};

// This is used with the DatePicker component
// to correct it's behavior of showing selected dates
// adjusted to the local time zone
export const mapLocalDateToUTC = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
};
