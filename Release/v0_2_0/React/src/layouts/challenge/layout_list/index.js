import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { challengeActions } from "../toolkit/actions/challenge_actions";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftPagination from "components/SoftPagination";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ChallengeCard from "../components/ChallengeCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import JoinChIdList from "./../components/JoinChIdList/index";

// Overview page components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GymunityNavbar from "examples/Navbars/GymunityNavbar";

function Challenge() {
  const { currentPage = 1 } = useParams();
  const dispatch = useDispatch();

  const getChallengeList = useCallback(
    (page) => {
      console.log("currentPage:", page);
      dispatch(challengeActions.getChallengeListAsync(page));
    },
    [dispatch]
  );

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender && currentPage) {
      getChallengeList(currentPage);
      setIsInitialRender(false);
    }
  }, [currentPage, isInitialRender, getChallengeList]);

  const pv = useSelector((state) => state.challenge.pv || {});

  const challengeList = useSelector(
    (state) => state.challenge.challengeList || []
  );
  const joinList = useSelector((state) => {
    return (
      state.challenge.joinList.map((item) => ({
        ...item,
        isJoined: true,
      })) || []
    );
  });
  const joinChIdList = joinList.map((item) => item.ch_id);
  console.log("joinChIdList:", joinChIdList);

  const updatedChallengeList = challengeList.map((challenge) => {
    return {
      ...challenge,
      isJoined: joinChIdList.includes(challenge.ch_id),
    };
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={5} mb={3}>
        <Card>
          <SoftBox pt={5} px={5}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h5" fontWeight="medium">
                참여중인 챌린지
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={3}>
              <SoftTypography variant="h6" fontWeight="regular" color="text">
                참여중인 챌린지를 확인하고 이행 여부를 인증해보세요!
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {joinList.map((challenge) => (
                <Grid item xs={12} md={6} xl={3} key={challenge.ch_id}>
                  <ChallengeCard challenge={challenge} />
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                md={6}
                xl={3}
                component={Link}
                to="/challenge/create"
              >
                <PlaceholderCard
                  title={{ variant: "h5", text: "챌린지 만들기" }}
                  outlined
                />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
        <SoftBox mt={5} mb={3}></SoftBox>
        <Card>
          <SoftBox pt={5} px={5}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h5" fontWeight="medium">
                전체 챌린지 리스트
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={3}>
              <SoftTypography variant="h6" fontWeight="regular" color="text">
                진행중인 챌린지를 확인하고 참여해보세요!
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {updatedChallengeList.map((challenge) => (
                <Grid item xs={12} md={6} xl={3} key={challenge.ch_id}>
                  <ChallengeCard challenge={challenge} />
                </Grid>
              ))}
            </Grid>
          </SoftBox>
        </Card>

        {/* TODO SoftPagination 설정 */}
        {pv && <SoftPagination getChallengeList={getChallengeList} />}
      </SoftBox>
      <GymunityNavbar />
    </DashboardLayout>
  );
}

export default Challenge;
