import { parseDate } from "./parseDate";

export const sortDate = (aDate: string, bDate: string) => {
  const dateA = parseDate(aDate);
  const dateB = parseDate(bDate);
  return dateA.getTime() - dateB.getTime();
};
