import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./reducers/login";
import SuggestionReducer from "./reducers/suggestion";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    suggestion: SuggestionReducer,
  },
});

export default store;
