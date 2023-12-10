import dayjs from "dayjs";

import { constants } from "../../utils/constants";
import { EventsItemType } from "../../types/eventsItem";

export const getOriginData = () => {
  const originData: EventsItemType[] = [];
  for (let i = 0; i < 100; i++) {
    originData.push({
      id: i.toString(),
      name: `Подія ${i}`,
      startDate:
        i % 2 === 0
          ? dayjs(new Date()).format(constants.dateFormat).toString()
          : dayjs(new Date(new Date().setDate(21)))
              .format(constants.dateFormat)
              .toString(),
      endDate:
        i % 2 === 0
          ? dayjs(new Date()).format(constants.dateFormat).toString()
          : dayjs(new Date(new Date().setDate(21)))
              .format(constants.dateFormat)
              .toString(),
      type: i % 2 === 0 ? "Семінар" : "Тренінг",
      orientation: i % 2 === 0 ? "виховники" : "суспільники",
      ageRestrictions: i % 2 === 0 ? "суменята" : "дружинники",
      venue: i % 2 === 0 ? "Івано-Франківськ" : "вул. Шевченка 20б",
      financialFeatures: "Фінансові особливості",
    });
  }
  return originData;
};
