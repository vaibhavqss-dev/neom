import { configureStore } from "@reduxjs/toolkit";
import tokens from "./reducers/login";
import SuggestionReducer from "./reducers/suggestion";

const store = configureStore({
  reducer: {
    login: tokens,
    suggestion: SuggestionReducer,
  },
});

export default store;
