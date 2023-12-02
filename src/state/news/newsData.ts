import dayjs from "dayjs";

import { constants } from "../../utils/constants";
import { NewsItemType } from "../../types/newsItem";

export const getOriginData = () => {
  const originData: NewsItemType[] = [];
  for (let i = 0; i < 100; i++) {
    originData.push({
      id: i.toString(),
      name: `Новина ${i}`,
      date:
        i % 2 === 0
          ? dayjs(new Date()).format(constants.dateFormat).toString()
          : dayjs(new Date(new Date().setDate(21)))
              .format(constants.dateFormat)
              .toString(),
    });
  }
  return originData;
};
