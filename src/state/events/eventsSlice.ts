import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { EventsItemType } from "../../types/eventsItem";
import {
  addEvent,
  deleteEvent,
  editEvent,
  fetchEvents,
} from "./eventsOperations";
import { handleAddItemPending, handlePending } from "state/utils/handlePending";
import {
  handleAddItemFulfilled,
  handleDeleteItemFulfilled,
  handleEditItemFulfilled,
  handleFetchItemsFulfilled,
} from "state/utils/handleFulfilled";
import { handleRejected } from "state/utils/handleRejected";

interface EventsState {
  isLoading: boolean;
  error: any;
  items: EventsItemType[];
  needUpdate: boolean;
}

const initialState: EventsState = {
  isLoading: false,
  error: null,
  items: [],
  needUpdate: true,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, handlePending)
      .addCase(fetchEvents.fulfilled, handleFetchItemsFulfilled)
      .addCase(fetchEvents.rejected, handleRejected);
    builder
      .addCase(addEvent.pending, handleAddItemPending)
      .addCase(addEvent.fulfilled, handleAddItemFulfilled)
      .addCase(addEvent.rejected, handleRejected);
    builder
      .addCase(deleteEvent.pending, handlePending)
      .addCase(deleteEvent.fulfilled, handleDeleteItemFulfilled)
      .addCase(deleteEvent.rejected, handleRejected);
    builder
      .addCase(editEvent.pending, handlePending)
      .addCase(editEvent.fulfilled, handleEditItemFulfilled)
      .addCase(editEvent.rejected, handleRejected);
  },
  reducers: {
    setUpdate: (state, action: PayloadAction<boolean>) => {
      state.needUpdate = action.payload;
    },
  },
});

export const { setUpdate } = eventsSlice.actions;

export default eventsSlice.reducer;
