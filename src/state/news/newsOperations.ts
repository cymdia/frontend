import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOriginData } from "./newsData";
import { NewsItemType } from "types/newsItem";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      await delay();
      const news = getOriginData();
      return news;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addNew = createAsyncThunk(
  "news/addNew",
  async (data: NewsItemType, { rejectWithValue }) => {
    try {
      await delay();
      const id = generateUniqueId();
      return { ...data, id };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteNew = createAsyncThunk(
  "news/deleteNew",
  async (id: string, { rejectWithValue }) => {
    try {
      await delay();
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editNew = createAsyncThunk(
  "news/editNew",
  async (data: NewsItemType, { rejectWithValue }) => {
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
