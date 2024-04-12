// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "../../profile/components/Header/index";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import categoryToLoseWeight from "assets/images/category/category_toloseweight.jpg";
import categoryToIncreaseMuscle from "assets/images/category/category_toincreasemuscle.jpg";
import categoryPhsicalStrength from "assets/images/category/category_physicalstrength.jpg";
import categoryDiet from "assets/images/category/category_diet.jpg";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Link } from "react-router-dom";

function Challenge() {
  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}></SoftBox>
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                참여중인 챌린지
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                참여중인 챌린지를 확인하고 이행 여부를 인증해보세요!
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryToLoseWeight}
                  category="체지방 감소"
                  title="매일 러닝머신 30분"
                  master="뱃살대마왕"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "join",
                    color: "info",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryDiet}
                  category="다이어트"
                  title="점심 식단 인증"
                  master="뱃살대마왕"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "join",
                    color: "info",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3} component={Link} to="/challenge/create">
                <PlaceholderCard title={{ variant: "h5", text: "챌린지 만들기" }} outlined />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
        <SoftBox mt={3} mb={3}></SoftBox>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                챌린지 리스트
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                진행중인 챌린지를 확인하고 참여해보세요!
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryToLoseWeight}
                  category="다이어트"
                  title="매일 러닝머신 30분"
                  master="뱃살대마왕"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "ongoing",
                    color: "info",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryToIncreaseMuscle}
                  category="체력 증진"
                  title="주말 등산 1회"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "ongoing",
                    route: "/challenge/list/1",
                    color: "info",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryPhsicalStrength}
                  label="체력 증진"
                  title="주 3회 헬스장 가기"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "ongoing",
                    route: "/challenge/list/1",
                    color: "info",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryPhsicalStrength}
                  label="체력 증진"
                  title="주 3회 헬스장 가기"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "ongoing",
                    route: "/challenge/list/1",
                    color: "info",
                  }}
                />
              </Grid>
            </Grid>
            <SoftBox mt={5} mb={3}></SoftBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryToLoseWeight}
                  label="체지방 감소"
                  title="매일 러닝머신 30분"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "ongoing",
                    route: "/challenge/list/1",
                    color: "info",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryPhsicalStrength}
                  label="체력 증진"
                  title="주말 등산 1회"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "ongoing",
                    route: "/challenge/list/1",
                    color: "info",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryPhsicalStrength}
                  label="체력 증진"
                  title="주 3회 헬스장 가기"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "ongoing",
                    route: "/challenge/list/1",
                    color: "info",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={categoryPhsicalStrength}
                  label="체력 증진"
                  title="주 3회 헬스장 가기"
                  master_grade="bronze"
                  total_participants="3"
                  cetify_term="매일"
                  challenge_term="4주간"
                  action={{
                    type: "ongoing",
                    route: "/challenge/list/1",
                    color: "info",
                  }}
                />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Challenge;
