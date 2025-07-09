import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    Id: -1,
  },
  reducers: {
    saveId: (state, action) => {
      state.Id = action.payload;
    },
  },
});

export const { saveId } = authSlice.actions;
export const selectId = (state) => state.auth.Id;

export default authSlice.reducer;

// index.js is already configured to the provider and the store, all that's needed is to
// import the following functions and reducers:
//      import { useDispatch, useSelector } from "react-redux";
//      import { selectId, saveId } from "./redux/authSlice";
// then you would save the id by invoking dispatch(saveId(whatever)) where dispatch = useDispatch()
// and call the id in the store by using e.g., const id = useSelector((state) => selectId(state));

// to access the data of promise after api call, use .then e.g. const result = login(data).then
