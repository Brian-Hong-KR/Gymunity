
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Link from "@mui/material/Link";
import SoftButton from "components/SoftButton";

// Images
import ball from "assets/images/store/ball.JPG"
import band from "assets/images/store/band.JPG"
import cattle_bell from "assets/images/store/cattle_bell.JPG"
import chulbong from "assets/images/store/chulbong.JPG"
import cycle from "assets/images/store/cycle.JPG"
import dumbel from "assets/images/store/dumbel.JPG"
import ems from "assets/images/store/ems.JPG"
import form_roller from "assets/images/store/form_roller.JPG"
import gel from "assets/images/store/gel.JPG"
import gymball from "assets/images/store/gymball.JPG"
import msg_gun from "assets/images/store/msg_gun.JPG"
import pilates_ring from "assets/images/store/pilates_ring.JPG"
import running from "assets/images/store/running.JPG"
import smart_weight from "assets/images/store/smart_weight.JPG"
import squart_mc from "assets/images/store/squart_mc.JPG"
import step_box from "assets/images/store/step_box.JPG"
import stepper from "assets/images/store/stepper.JPG"
import stick from "assets/images/store/stick.JPG"
import strech_stick from "assets/images/store/strech_stick.JPG"
import trampulin from "assets/images/store/trampulin.JPG"
import yoga_mat from "assets/images/store/yoga_mat.JPG"
import push_up_bar from "assets/images/store/push_up_bar.JPG"
export default function data() {

  return {
    columns: [
      { name: "상품명", align: "center" },
      { name: "용도", align: "center" },
      { name: "링크", align: "center" }
    ],

    rows: [
      {
        상품명: [smart_weight, "스마트 체중계 "],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            건강 상태 파악 (체중, 체지방률, 근육량 등)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4O0n"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="dark"
            fullWidth > 추천 상품 </SoftButton>
      },
      {
        상품명: [yoga_mat, "요가매트"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            부상 방지 (스트레칭, 요가, 필라테스 등)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Oom"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="dark"
            fullWidth > 추천 상품 </SoftButton>
      },
            {
        상품명: [msg_gun, "마사지건"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            회복 (근육 이완, 통증 완화, 혈액 순환 개선)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4J5T"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="dark"
            fullWidth > 추천 상품 </SoftButton>
      },
      {
        상품명: [stick, "지압봉"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            회복 (근육 이완, 통증 완화, 혈액 순환 개선)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4NV4"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="dark"
            fullWidth > 추천 상품 </SoftButton>
      },


            {
        상품명: [form_roller, "폼롤러"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            회복 (근육 이완, 통증 완화, 혈액 순환 개선)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Ohh"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [ball, "라크로스 볼"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            회복 (근육 이완, 통증 완화, 혈액 순환 개선)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4LNm"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [gel, "스포츠 젤"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            통증 완화, 염증 감소
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4K89"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [step_box, "스텝박스"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            유산소, 하체 근육량 증가, 균형 감각
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Qiv"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [stepper, "스텝퍼"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            계단 오르기 (체지방률 감소, 하체 근육량 증가)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Qoc"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [cycle, "헬스 사이클"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            자전거 (체지방률 감소, 지구력 증가)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4PUp"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [running, "런닝머신"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            달리기 (체지방률 감소, 지구력 증가)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4P3x"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [trampulin, "트램펄린"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            점프 (체지방률 감소, 지구력 증가)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4QdT"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
    {
        상품명: [ems, "EMS 트레이닝"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            전기 자극 (체지방 감소, 통증 완화)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Rvg"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [band, "탄력밴드"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            다양한 활용 (근육량, 유연성, 재활 등)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Mps"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [pilates_ring, "필라테스 링"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            필라테스 (유연성, 균형 감각)
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Otv"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },

            {
        상품명: [gymball, "짐볼"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            코어 트레이닝, 재활 운동, 균형 감각 향상
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4N9N"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [strech_stick, "스트레칭 봉"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            스트레칭 효율 증가, 유연성 향상
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4OEC"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [push_up_bar, "푸쉬업 바"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            푸쉬업 효율 증가
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4QYq"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
          {
        상품명: [squart_mc, "스쿼트 머신"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            스쿼트 효율 증가, 부상 방지
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Qzm"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [dumbel, "아령"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            근육량 증가
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4QEQ"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [cattle_bell, "케틀벨"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            근육량 증가, 지구력 향상
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4QJE"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },
      {
        상품명: [chulbong, "철봉"],
        용도: <SoftTypography variant="caption" color="text" fontWeight="medium">
            턱걸이 운동
          </SoftTypography>,
        링크: <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Q3i"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth > 구매하기 </SoftButton>
      },



    ],
  };
}
