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

// Overview page components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GymunityNavbar from "examples/Navbars/GymunityNavbar";
import FilteringByCategory from "../components/FilteringByCategory";
import SoftButton from "components/SoftButton";

function Challenge() {
  const { currentPage = 1 } = useParams();
  const dispatch = useDispatch();

  const getChallengeList = useCallback((page) => {
    console.log("currentPage:", page);
    dispatch(challengeActions.getChallengeListAsync(page));
  }, []);

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender && currentPage) {
      getChallengeList(currentPage);
      setIsInitialRender(false);
    }
  }, [currentPage, isInitialRender, getChallengeList]);

  // const challengeList = useSelector(
  //   (state) => state.challenge.challengeList || []
  // );
  const challengeList = useSelector((state) => [
    ...(state.challenge.challengeList || []),
    ...(state.challenge.newChallengeList || []),
  ]);

  const joinList = useSelector((state) => state.challenge.joinList || []);
  console.log("joinList:", joinList);

  const joinChIdList =
    joinList.length > 0 && typeof joinList[0] === "object"
      ? Object.values(joinList[0])
      : [];
  console.log("joinChIdList:", joinChIdList);
  // console.log("joinChIdList:", typeof joinChIdList[0]);

  const updatedChallengeList = challengeList.map((challenge) => {
    return {
      ...challenge,
      isJoined:
        challenge.chId === joinChIdList[0] ||
        challenge.chId === joinChIdList[1],
    };
  });

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLoadMore = () => {
    const nextPage = parseInt(currentPage) + 1;
    getChallengeList(nextPage);
  };

  //TODO localStorage.getItem('userId');로 바꾸기
  // const localStorage.getItem =131;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={5} mb={3}>
        {localStorage.getItem("userId") && (
          // 로그인 시에만 '참여중 챌린지' 표시
          <>
            <Card>
              <SoftBox pt={3} px={2}>
                <SoftBox mb={0.5}>
                  <SoftTypography variant="h5" fontWeight="medium">
                    참여중인 챌린지
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={3}>
                  <SoftTypography
                    variant="h6"
                    fontWeight="regular"
                    color="text"
                  >
                    참여중인 챌린지를 확인하고 이행 여부를 인증해보세요!
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
              <SoftBox p={1} m={1}>
                <Grid container spacing={5}>
                  {joinList &&
                    joinList.map((challenge) => (
                      <Grid item xs={12} md={6} xl={3} key={challenge.chId}>
                        <Link to={`/challenge/detail/${challenge.chId}`}>
                          <ChallengeCard challenge={challenge} />
                        </Link>
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
          </>
        )}
        <SoftBox mt={3} mb={3}></SoftBox>
        <Card>
          <SoftBox pt={5} px={3}>
            <SoftBox mb={0.5} mt={3}>
              <SoftTypography variant="h5" fontWeight="medium">
                전체 챌린지 리스트
              </SoftTypography>
            </SoftBox>

            <SoftBox mb={3}>
              <SoftTypography variant="h6" fontWeight="regular" color="text">
                진행중인 챌린지를 확인하고 참여해보세요!
              </SoftTypography>
            </SoftBox>
            <FilteringByCategory
              selectedItem={selectedItem}
              onSelectItem={handleItemClick}
            />
          </SoftBox>
          <SoftBox p={1} m={2}>
            <Grid container spacing={5}>
              {updatedChallengeList
                .filter((challenge) => {
                  if (selectedItem && selectedItem.id === 0) {
                    return true;
                  } else if (selectedItem) {
                    return selectedItem.id === challenge.category;
                  } else {
                    return true; // 선택된 항목이 없는 경우 모든 항목을 반환
                  }
                })
                .map((challenge) => (
                  <Grid item xs={12} md={6} xl={3} key={challenge.chId}>
                    <Link to={`/challenge/detail/${challenge.chId}`}>
                      <ChallengeCard challenge={challenge} />
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </SoftBox>
        </Card>
        <SoftBox
          mt={3}
          position="absolute"
          minWidth="300px"
          width="100%"
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            display: "flex", // 가로 정렬 설정
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SoftButton
            variant="gradient"
            color="dark"
            onClick={handleLoadMore}
            sx={{ width: "150px", marginRight: "50px" }}
          >
            더 보기
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Challenge;
