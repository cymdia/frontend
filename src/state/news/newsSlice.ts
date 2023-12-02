import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getOriginData } from "./newsData";
import { NewsItemType } from "../../types/newsItem";
// import data from newsData

interface NewsState {
  name: string;
  date: string;
  id: string;
}

const initialState: NewsState[] = getOriginData();

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNew: (state, action: PayloadAction<NewsItemType>) => {
      state.push(action.payload);
    },
    deleteNew: (state, action: PayloadAction<NewsItemType>) => {
      const index = state.findIndex((item) => action.payload.id === item.id);
      state.splice(index, 1);
      state = [...state];
    },
    editNew: (state, action: PayloadAction<NewsItemType>) => {
      const news = action.payload;

      const newData = [...state];
      const index = newData.findIndex((item) => news.id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...news,
        });
        state = [...newData];
      }

      //TODO: CHECKIT
    },
  },
});

export const { addNew, deleteNew, editNew } = newsSlice.actions;

export default newsSlice.reducer;
