import { PayloadAction } from "@reduxjs/toolkit";

export const handleRejected = <T, E>(
  state: T,
  action: PayloadAction<E>,
): T => ({
  ...state,
  isLoading: false,
  error: action.payload,
});
