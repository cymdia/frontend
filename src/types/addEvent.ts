import { Dayjs } from "dayjs";

export type AddEventType = {
  name: string;
  date?: [Dayjs, Dayjs];
  dateMonth: Dayjs;
  type: string;
  orientation: string;
  ageRestrictions: string;
  venue: string;
  financialFeatures: string;
};
