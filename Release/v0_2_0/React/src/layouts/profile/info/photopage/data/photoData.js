import SoftTypography from "components/SoftTypography";
import Link from "@mui/material/Link";
import SoftButton from "components/SoftButton";

// Images
import msg_gun from "assets/images/store/msg_gun.JPG";
import smart_weight from "assets/images/store/smart_weight.JPG";
import yoga_mat from "assets/images/store/yoga_mat.JPG";
export default function data() {
  return {
    columns: [
      { name: "사진", align: "center" },
      { name: "챌린지", align: "center" },
      { name: "날짜", align: "left" },
    ],

    rows: [
      {
        사진: [smart_weight, "스마트 체중계 "],
        챌린지: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            건강 상태 파악 (체중, 체지방률, 근육량 등)
          </SoftTypography>
        ),
        날짜: (
          <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4O0n"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="dark"
          >
            추천
          </SoftButton>
        ),
      },
      {
        사진: [yoga_mat, "요가매트"],
        용도: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            부상 방지 (스트레칭, 요가, 필라테스 등)
          </SoftTypography>
        ),
        링크: (
          <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4Oom"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="dark"
          >
            {" "}
            추천{" "}
          </SoftButton>
        ),
      },
      {
        사진: [msg_gun, "마사지건"],
        용도: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            회복 (근육 이완, 통증 완화, 혈액 순환 개선)
          </SoftTypography>
        ),
        링크: (
          <SoftButton
            component={Link}
            href="https://link.coupang.com/a/bw4J5T"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="dark"
          >
            {" "}
            추천{" "}
          </SoftButton>
        ),
      },
    ],
  };
}
