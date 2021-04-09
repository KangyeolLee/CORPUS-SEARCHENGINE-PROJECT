import { createSlice } from "@reduxjs/toolkit";

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    searchWords: "",
    aroundWords: {
      value: "",
    },
  },
  reducers: {
    updateSearchWord: (state, action) => {
      state.searchWords = action.payload;
    },
  },
});

export const { updateSearchWord } = searchResultSlice.actions;

export default searchResultSlice.reducer;
