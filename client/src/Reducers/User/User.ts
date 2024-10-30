import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import createUser from "./User.utils";

interface UserState {
  isLoading: boolean;
  email: string;
  password: string;
  userName: string;
  error: SerializedError | string | null;
}

const initialState: UserState = {
  isLoading: false,
  email: "",
  password: "",
  userName: "",
  error: null,
};

const User = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create a user
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error || "something went wrong";
      });
  },
});

export const { setEmail, setPassword, setUserName } = User.actions;

export default User;
