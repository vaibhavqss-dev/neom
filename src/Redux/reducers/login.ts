import { createSlice } from "@reduxjs/toolkit";

const tokens = createSlice({
  name: "Token",
  initialState: {},
  reducers: {
    addToken(state: any, action: any) {
      return {
        user_id: action.payload.user_id,
        token: action.payload.token,
        fullname: action.payload.fullname,
        email: action.payload.email,
        username: action.payload.username,
      };
    },
    deleteToken(state: any, action: any) {
      return {};
    },

    getToken(state: any, action: any) {
      return state;
    },
  },
});
export const { addToken, deleteToken, getToken } = tokens.actions;
export default tokens.reducer;
