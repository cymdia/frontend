import dayjs from "dayjs";

export const parsedDateToEdit = (date?: string) => {
  if (!date) {
    return dayjs();
  }
  const parts = date.split(" ");
  const dateParts = parts[0].split("-");
  const timeParts = parts[1].split(":");
  const isoString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts[0]}:${timeParts[1]}:00.000`;

  return dayjs(new Date(isoString));
};
