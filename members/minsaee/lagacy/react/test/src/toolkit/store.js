import { configureStore } from "@reduxjs/toolkit";

// 더미 리듀서
const dummyReducer = (state = {}, action) => state;

const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
});

export default store;
