PT Server >

Challenge 와 주고 받을 데이터가 없는 것 같습니다.
Admin 과 아래 3가지 시나리오에 대해서 합의되어야 합니다.

1. (A to P) 로그인 

   - signup.html 에서 로그인 후 survey.html 호출 파라미터 ( uid, gender, birth)
   - 예시 : https://gymunity.ai/pt/survey.html?user_id=abc&gender=m&birth=19900202

2. (P to A) 설문 완료 

   - survey.html 에서 설문 완료 후 main.html 호출 파라미터 ( uid, pt_plan )
   - 예시 : https://gymunity.ai/main.html?user_id=abc&plan_name=다이어트

3. (P to A) 오늘 운동 완료 
   - exercise.html 에서 운동 완료 후 POST plus_point ( uid, count )
   - 향후 고려할 사항 : 암호화 필요

