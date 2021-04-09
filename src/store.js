import { configureStore } from "@reduxjs/toolkit";
import textFileReducer from "../src/features/textFile/textFileSlice";
import searchResultReducer from "../src/features/searchResult/searchResultSlice";

export default configureStore({
  reducer: {
    textFile: textFileReducer,
    searchResult: searchResultReducer,
  },
});
