import axios from "axios";
import { challengeReducers } from "../createSlice/challenge_createSlice";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("Authorization")}`,
    "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
  },
};

//리스트 가져오기
function getChallengeListAsync(currentPage) {
  console.log("currentPage: ", currentPage);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/challenge/list/${currentPage}`,
        config
      );

      const { challengeList, joinList, pv } = response.data;
      dispatch(challengeReducers.getChallengeList({ challengeList, pv }));
      dispatch(challengeReducers.getJoinList({ joinList }));
    } catch (error) {
      console.error(
        "챌린지 및 참여 목록 데이터를 가져오는 중 오류 발생:",
        error
      );
    }
  };
}

// //챌린지 생성하기
// function getChallengeCreate(formData, config) {
//   return async () => {
//     await axios.post(`/challenge/create`, formData, config).then((response) => response.data);
//   };
// }
//챌린지 생성하기
function getChallengeCreate(formData, config) {
  return async () => {
    await axios
      .post(`/challenge/create`, formData, config)
      .then((response) => response.data);
  };
}

//챌린지 참여하기
function getChallengeJoin(chId) {
  return async () => {
    try {
      const response = await axios.post(
        `/challenge/join/${chId}`,
        {
          chId,
        },
        config
      );
      // console.log("parsedChId: ", typeof parsedChId);
      return response.data;
    } catch (error) {
      console.error("챌린지 참여하기 중 오류 발생:", error);
      throw error;
    }
  };
}

//챌린지 상세페이지
function getChallengeDetail(chId) {
  return async (dispatch) => {
    const data = await axios
      .get(`/challenge/detail/${chId}`, config)
      .then((response) => response.data);
    dispatch(challengeReducers.getChallengeDetail({ data }));
  };
}

//첨부파일 다운로드
function getChallengeDownload(upload, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`/challenge/contentdownload/${upload}`, config)
      .then((response) => response.data);
    // dispatch(challengeActions.getChallengeDownload(data));
    return data;
  };
}

//수정하기
function getChallengeUpdate(formData, config) {
  return async () => {
    await axios
      .put(`/challenge/update`, formData, config)
      .then((response) => response.data);
  };
}

//삭제하기
function getChallengeDelete(chId) {
  return async () => {
    await axios
      .delete(`/challenge/delete/${chId}`, config)
      .then((response) => response.data);
  };
}

export const challengeActions = {
  getChallengeListAsync,
  getChallengeCreate,
  getChallengeJoin,
  getChallengeDetail,
  getChallengeDownload,
  getChallengeUpdate,
  getChallengeDelete,
};
