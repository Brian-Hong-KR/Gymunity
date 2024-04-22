import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  challengeList: [],
  pv: { currentPage: 1 },
  joinList: [],
  challengeDetail: {},
  challengeFile: null,
};

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    getChallengeList(state, action) {
      state.challengeList = action.payload.challengeList;
      state.pv = action.payload.pv;
    },
    getJoinList(state, action) {
      state.joinList = action.payload.joinList;
    },
    getChallengeDetail(state, action) {
      state.challengeDetail = action.payload.data;
    },
  },
});

// board_action에서 사용함
//export const {getBoardList} = boardSlice.actions;
export const challengeReducers = challengeSlice.actions;

//store에서 사용함
export default challengeSlice;
