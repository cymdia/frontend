import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOriginData } from "./eventsData";
import { EventsItemType } from "types/eventsItem";
import { AddEventType } from "types/addEvent";
import { constants } from "utils/constants";
import dayjs, { Dayjs } from "dayjs";
import {
  ageRestrictionsItems,
  orientationItems,
  typeItems,
} from "utils/constants/eventsDropdownData";
import { SelectProps } from "antd/lib/select";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      await delay();
      const events = getOriginData();
      return events;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (data: AddEventType, { rejectWithValue }) => {
    try {
      await delay();
      const id = generateUniqueId();

      return {
        ...data,
        startDate: getStartDate(data.dateMonth, data.date),
        endDate: getEndDate(data.date),
        ageRestrictions: getItemName(
          ageRestrictionsItems,
          data.ageRestrictions,
        ),
        orientation: getItemName(orientationItems, data.orientation),
        type: getItemName(typeItems, data.type),
        id,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id: string, { rejectWithValue }) => {
    try {
      await delay();
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editEvent = createAsyncThunk(
  "events/editEvent",
  async (data: EventsItemType, { rejectWithValue }) => {
    try {
      await delay();
      return {
        ...data,
        startDate: dayjs(data.startDate).format(constants.dateFormat),
        endDate: dayjs(data.endDate).format(constants.dateFormat),
        ageRestrictions: getItemName(
          ageRestrictionsItems,
          data.ageRestrictions,
        ),
        orientation: getItemName(orientationItems, data.orientation),
        type: getItemName(typeItems, data.type),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const delay = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

function generateUniqueId() {
  return "id-" + Math.random().toString(36).substr(2, 16);
}

const getStartDate = (dateMonth: Dayjs, date?: [Dayjs, Dayjs]): string =>
  date !== undefined
    ? dayjs(date[0]).format(constants.dateFormat)
    : dayjs(dateMonth).format(constants.monthFormatView);

const getEndDate = (date?: [Dayjs, Dayjs]): string =>
  date !== undefined ? dayjs(date[1]).format(constants.dateFormat) : "Невідомо";

const getItemName = (items: SelectProps["options"], id: string) =>
  !isNaN(parseInt(id)) ? items?.find((item) => item.value === id)?.label : id;
