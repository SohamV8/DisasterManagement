import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUserRoles: (state, action) => {
      if (state.user) {
        state.user.roles = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateUserRoles } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
