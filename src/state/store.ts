import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "./news/newsSlice";
import eventsReducer from "./events/eventsSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    events: eventsReducer,
    auth: authReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
