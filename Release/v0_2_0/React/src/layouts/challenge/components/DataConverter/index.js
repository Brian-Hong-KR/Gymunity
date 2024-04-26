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

function DataConverter(challenge) {
  //카테고리 변환
  let image;
  let category;
  switch (challenge.category) {
    case 1:
      category = "체중 감량";
      image = categoryToLoseWeight;
      break;
    case 2:
      category = "근력 향상";
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

  //시작일을 D-day로 변환
  const remainingDays = getDaysRemaining(challenge.chStartDate);

  return {
    image,
    category,
    grade,
    verifyTerm,
    remainingDays,
  };
}

export default DataConverter;
