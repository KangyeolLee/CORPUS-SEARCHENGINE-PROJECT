import { createSlice } from "@reduxjs/toolkit";

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    searchWords: "",
    aroundWords: "",
  },
  reducers: {
    updateSearchWord: (state, action) => {
      state.searchWords = action.payload;
    },
    updateAroundWord: (state, action) => {
      state.aroundWords = action.payload;
    },
  },
});

export const { updateSearchWord, updateAroundWord } = searchResultSlice.actions;

export default searchResultSlice.reducer;
