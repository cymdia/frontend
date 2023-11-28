export const parseDate = (dateString: string): Date => {
  const [day, month, rest] = dateString.split("-");
  const [year, time] = rest.split(" ");
  const [hours, minutes] = time.split(":");
  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
  );
};
