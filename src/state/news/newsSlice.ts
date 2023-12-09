import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NewsItemType } from "../../types/newsItem";
import { addNew, deleteNew, editNew, fetchNews } from "./newsOperations";
import { handleAddItemPending, handlePending } from "state/utils/handlePending";
import {
  handleAddItemFulfilled,
  handleDeleteItemFulfilled,
  handleEditItemFulfilled,
  handleFetchItemsFulfilled,
} from "state/utils/handleFulfilled";
import { handleRejected } from "state/utils/handleRejected";

interface NewsState {
  isLoading: boolean;
  error: any;
  items: NewsItemType[];
  needUpdate: boolean;
}

const initialState: NewsState = {
  isLoading: false,
  error: null,
  items: [],
  needUpdate: true,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, handlePending)
      .addCase(fetchNews.fulfilled, handleFetchItemsFulfilled)
      .addCase(fetchNews.rejected, handleRejected);
    builder
      .addCase(addNew.pending, handleAddItemPending)
      .addCase(addNew.fulfilled, handleAddItemFulfilled)
      .addCase(addNew.rejected, handleRejected);
    builder
      .addCase(deleteNew.pending, handlePending)
      .addCase(deleteNew.fulfilled, handleDeleteItemFulfilled)
      .addCase(deleteNew.rejected, handleRejected);
    builder
      .addCase(editNew.pending, handlePending)
      .addCase(editNew.fulfilled, handleEditItemFulfilled)
      .addCase(editNew.rejected, handleRejected);
  },
  reducers: {
    setUpdate: (state, action: PayloadAction<boolean>) => {
      state.needUpdate = action.payload;
    },
  },
});

export const { setUpdate } = newsSlice.actions;

export default newsSlice.reducer;
