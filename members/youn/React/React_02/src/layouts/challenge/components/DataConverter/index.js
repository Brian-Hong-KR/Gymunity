// 이미지
import categoryToLoseWeight from "assets/images/category/category_toloseweight.jpg";
import categoryToIncreaseMuscle from "assets/images/category/category_toincreasemuscle.jpg";
import categoryPhysicalStrength from "assets/images/category/category_physicalstrength.jpg";
import icon_bronze from "assets/images/grade/grade_bronze.png";

//시작일을 D-day로 변환
const getDaysRemaining = (startDate) => {
  const today = new Date();
  const targetDate = new Date(startDate);
  const diffInMs = targetDate - today;
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

//종료일 날짜 구하기
const getEndDate = (startDate, days) => {
  // 1. startDate 유효성 검사
  if (isNaN(Date.parse(startDate))) {
    return null; // Indicate invalid date with null return
  }
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(
    startDateObject.getTime() + days * 24 * 60 * 60 * 1000
  );
  return endDateObject.toISOString().split("T")[0];
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
      image = categoryPhysicalStrength;
      break;
  }

  //등급이미지 변환
  let grade;
  switch (challenge.gradeName) {
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
  let verifyTerm;
  switch (challenge.verifyTerm) {
    case 1:
      verifyTerm = "매일";
      break;
    case 2:
      verifyTerm = "평일";
      break;
    case 3:
      verifyTerm = "주말";
      break;
    case 4:
      verifyTerm = "주 1일";
      break;
    case 5:
      verifyTerm = "주 2일";
      break;
    case 6:
      verifyTerm = "주 3일";
      break;
  }

  //챌린지 기간 변환
  let period;
  let days;
  switch (challenge.challengePeriod) {
    case 1:
      period = "1주간";
      days = 6;
      break;
    case 2:
      period = "2주간";
      days = 13;
      break;
    case 3:
      period = "4주간";
      days = 27;
      break;
    case 4:
      period = "6주간";
      days = 41;
      break;
    case 5:
      period = "8주간";
      days = 55;
      break;
  }

  //시작일을 D-day로 변환
  const remainingDays = getDaysRemaining(challenge.chStartDate);

  const endDate = getEndDate(challenge.chStartDate, days);

  return {
    image,
    category,
    grade,
    verifyTerm,
    period,
    remainingDays,
    days,
    endDate,
  };
}

export default DataConverter;
