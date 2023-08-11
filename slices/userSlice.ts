import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/types";
import { RootState } from "../store";

type State = {
  user: UserType;
};

const initialState: State = {
  user: {
    uid: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
