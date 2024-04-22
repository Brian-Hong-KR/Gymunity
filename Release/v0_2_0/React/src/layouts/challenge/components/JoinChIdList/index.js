import React from "react";
import { useSelector } from "react-redux";

const JoinChIdList = () => {
  const joinList = useSelector((state) => {
    return (
      state.challenge.joinList.map((item) => ({ ...item, isJoined: true })) ||
      []
    );
  });

  const joinChIdList = joinList.map((item) => item.ch_id);
  console.log("joinChIdList:", joinChIdList);

  return null; // 또는 필요한 UI 요소를 렌더링합니다.
};

export default JoinChIdList;
