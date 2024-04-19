import { configureStore } from "@reduxjs/toolkit";
import challengeSlice from "./createSlice/challenge_createSlice";
const store = configureStore({
  reducer: {
    challenge: challengeSlice.reducer,
  },
});

export default store;
