import { createSlice } from "@reduxjs/toolkit";

export const textFileSlice = createSlice({
  name: "textFile",
  initialState: {
    value: "",
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update } = textFileSlice.actions;

export default textFileSlice.reducer;
