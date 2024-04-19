import axios from "axios";
import { challengeReducers } from "../createSlice/challenge_createSlice";

//리스트 가져오기
// function getChallengeList(currentPage) {
//   console.log(currentPage);
//   return async (dispatch) => {
//     const data = await axios
//       .get(`/challenge/list/${currentPage}`)
//       .then((response) => response.data);
//     console.log(data);
//     dispatch(challengeReducers.getChallengeList({ data }));
//   };
// }
function getChallengeList(currentPage) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/challenge/list/${currentPage}`);
      const { challengeList, joinList } = response.data;

      dispatch(challengeReducers.getChallengeList({ challengeList }));
      dispatch(challengeReducers.getJoinList({ joinList }));
    } catch (error) {
      console.error("챌린지 및 참여 목록 데이터를 가져오는 중 오류 발생:", error);
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
function getChallengeCreate(formData) {
  return async () => {
    await axios.post(`/challenge/create`, formData).then((response) => response.data);
  };
}


//챌린지 상세페이지
// function getChallengeDetail(ch_id, config) {
//   return async (dispatch) => {
//     const data = await axios
//       .get(`/challenge/detail/${ch_id}`, config)
//       .then((response) => response.data);
//     dispatch(challengeReducers.getChallengeDetail({ data }));
//   };
// }
function getChallengeDetail(ch_id) {
  return async (dispatch) => {
    const data = await axios.get(`/challenge/detail/${ch_id}`).then((response) => response.data);
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
    await axios.put(`/challenge/update/${ch_id}`, formData, config).then((response) => response.data);
  };
}



//삭제하기
// function getChallengeDelete(ch_id, config) {
//   return async () => {
//     await axios.delete(`/challenge/delete/${ch_id}`, config).then((response) => response.data);
//   };
// }
function getChallengeDelete(ch_id) {
  return async () => {
    await axios.delete(`/challenge/delete/${ch_id}`).then((response) => response.data);
  };
}

export const challengeActions = {
  getChallengeList,
  getChallengeCreate,
  getChallengeDetail,
  getChallengeDownload,
  getChallengeUpdate,
  getChallengeDelete,
};
