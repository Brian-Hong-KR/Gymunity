import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  challengeList: [],
  newChallengeList: [], // 새로운 속성 추가
  pv: { currentPage: 1 },
  joinList: [],
  joinChIdList: [],
  challengeDetail: {},
};

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    getChallengeList(state, action) {
      // state.challengeList = action.payload.challengeList;
      state.challengeList = [
        ...state.challengeList,
        ...action.payload.newChallengeList,
      ];
      state.pv = action.payload.pv;
    },
    getJoinList(state, action) {
      state.joinList = action.payload.joinList;
    },
    getJoinChIdList(state, action) {
      state.joinChIdList = action.payload.joinChIdList;
    },
    getChallengeDetail(state, action) {
      state.challengeDetail = action.payload.data.challengeDetail;
      state.joinChIdList = action.payload.data.joinChIdList;
    },
    clearChallengeList(state) {
      state.challengeList = [];
      state.newChallengeList = [];
      state.pv.currentPage = 1;
    },
  },
});

// board_action에서 사용함
//export const {getBoardList} = boardSlice.actions;
export const challengeReducers = challengeSlice.actions;

//store에서 사용함
export default challengeSlice;
