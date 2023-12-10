import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOriginData } from "./eventsData";
import { EventsItemType } from "types/eventsItem";

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
  async (data: EventsItemType, { rejectWithValue }) => {
    try {
      await delay();
      const id = generateUniqueId();
      return { ...data, id };
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
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const delay = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

function generateUniqueId() {
  return "id-" + Math.random().toString(36).substr(2, 16);
}
