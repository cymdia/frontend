import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginType } from "types/login";
import { tokenKey } from "utils/constants/constants";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (data: LoginType, { rejectWithValue }) => {
    try {
      await delay();
      const token = generateUniqueId();
      localStorage.setItem(tokenKey, JSON.stringify(token));
      return { token };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const delay = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

function generateUniqueId() {
  return "id-" + Math.random().toString(36).substr(2, 16);
}
