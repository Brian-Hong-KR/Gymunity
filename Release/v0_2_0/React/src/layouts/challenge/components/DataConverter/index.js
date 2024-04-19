// 이미지
import categoryToLoseWeight from "assets/images/category/category_toloseweight.jpg";
import categoryToIncreaseMuscle from "assets/images/category/category_toincreasemuscle.jpg";
import categoryPhsicalStrength from "assets/images/category/category_physicalstrength.jpg";
import icon_bronze from "assets/images/grade/grade_bronze.png";

const getDaysRemaining = (startDate) => {
  const today = new Date();
  const targetDate = new Date(startDate);
  const diffInMs = targetDate - today;
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

function DataConverter(challenge) {
  //카테고리 변환
  let image;
  let category;
  switch (challenge.category) {
    case 1:
      category = "체지방 감소";
      image = categoryToLoseWeight;
      break;
    case 2:
      category = "근육량 증가";
      image = categoryToIncreaseMuscle;
      break;
    case 3:
      category = "종합 건강 증진";
      image = categoryPhsicalStrength;
      break;
  }

  //진행상태 변환
  let proceed;
  switch (challenge.proceed) {
    case "rec":
      proceed = "참여 가능";
      break;
    case "pr":
      proceed = "진행중";
      break;
    case "done":
      proceed = "종료";
      break;
  }

  //등급이미지 변환
  let grade;
  switch (challenge.grade_name) {
    case "브론즈":
      grade = icon_bronze;
      break;
    case "실버":
      grade = icon_bronze;
      break;
    case "골드":
      grade = icon_bronze;
      break;
    case "플래티넘":
      grade = icon_bronze;
      break;
  }

  //인증주기 변환
  let verify_term;
  switch (challenge.verify_term) {
    case 1:
      verify_term = "매일";
      break;
    case 2:
      verify_term = "평일";
      break;
    case 3:
      verify_term = "주말";
      break;
    case 4:
      verify_term = "주 1일";
      break;
    case 5:
      verify_term = "주 2일";
      break;
    case 6:
      verify_term = "주 3일";
      break;
  }

  //챌린지 기간 변환
  let period;
  switch (challenge.challenge_period) {
    case 1:
      period = "1주간";
      break;
    case 2:
      period = "2주간";
      break;
    case 3:
      period = "4주간";
      break;
    case 4:
      period = "6주간";
      break;
    case 5:
      period = "8주간";
      break;
  }

  //시작일을 D-day로 변환
  const remainingDays = getDaysRemaining(challenge.ch_start_date);

  return {
    image,
    category,
    proceed,
    grade,
    verify_term,
    period,
    remainingDays,
  };
}

export default DataConverter;
