import { createSlice } from "@reduxjs/toolkit";

import { fetchLogin } from "./authOperations";
import { handlePending } from "state/utils/handlePending";
import { handleLoginFulfilled } from "state/utils/handleFulfilled";
import { handleRejected } from "state/utils/handleRejected";
import { UserType } from "types/user";
import { tokenKey } from "utils/constants/constants";

interface AuthState {
  isLoading: boolean;
  error: any;
  user: UserType | null;
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.pending, handlePending)
      .addCase(fetchLogin.fulfilled, handleLoginFulfilled)
      .addCase(fetchLogin.rejected, handleRejected);
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(tokenKey);
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
