import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "./news/newsSlice";
import eventsReducer from "./events/eventsSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    events: eventsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
