import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "./../components/Header/index";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Images
import categoryToLoseWeight from "assets/images/category/category_toloseweight.jpg";
import categoryToIncreaseMuscle from "assets/images/category/category_toincreasemuscle.jpg";
import categoryPhsicalStrength from "assets/images/category/category_physicalstrength.jpg";
import categoryDiet from "assets/images/category/category_diet.jpg";

function Challenge() {
  const category_input = 1;
  function handleCategory(category_input) {
    if ((category_input = 1)) {
      category = "체지방 감소";
      image = { categoryToLoseWeight };
    } else if ((category_input = 2)) {
      category = "근육량 증가";
      image = { categoryToIncreaseMuscle };
    } else {
      category = "종합 건강 증진";
      image = { categoryPhsicalStrength };
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  ch_id="1"
                  category="체지방 감소"
                  image={categoryToLoseWeight}
                  title="매일 러닝머신 30분"
                  master="뱃살대마왕"
                  master_grade="bronze"
                  total_participants="3"
                  verify_frequency="매일"
                  challenge_term="4주간"
                  action={{
                    type: "joined",
                    proceed: "pr",
                    color: "info",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  ch_id="1"
                  category="다이어트"
                  image={categoryDiet}
                  title="점심 식단 인증"
                  master="뱃살대마왕"
                  master_grade="bronze"
                  total_participants="3"
                  verify_frequency="매일"
                  challenge_term="4주간"
                  action={{
                    type: "joined",
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
                  verify_frequency="매일"
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
                  verify_frequency="매일"
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
                  category="체력 증진"
                  title="주 3회 헬스장 가기"
                  master_grade="bronze"
                  total_participants="3"
                  verify_frequency="매일"
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
                  verify_frequency="매일"
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
                  verify_frequency="매일"
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
                  verify_frequency="매일"
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
                  verify_frequency="매일"
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
                  verify_frequency="매일"
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
