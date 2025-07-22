import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: {
      name: "",
      email: "",
    },
  },
  reducers: {
    saveUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveUserDetails } = userSlice.actions;
export const selectUserDetails = (state) => state.userDetails.user;

export default userSlice.reducer;
