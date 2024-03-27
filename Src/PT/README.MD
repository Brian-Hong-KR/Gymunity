1. 챗봇 서버 개발 요구사항
   On-Device AI 로 구현 (무료 서비스)
   Step : 영상 재생, 재생 완료시 Next Step

2. Admin Open API (필요)
   https://AdminServerIP:Port/plan_name <- POST ( id, pt_plan )
   http://AdminServerIP:Port/plus_point <- POST ( id, reward )
   Front Route Action
   https://gymunity.ai/survey.html -> https://gymunity.ai/survey_level.html?id="brian"&gender="male"&age="39"
   https://gymunity.ai/survey_level.html -> https://gymunity.ai/survey_abnormal.html?id="brian"&gender="male"&age="39"&level="beginner"
   https://gymunity.ai/survey_abnormal.html -> https://PTServerIP:Port/survey_abnormal ->
   https://gymunity.ai/pt_plan.html?id="brian"&gender="male"&age="39"&level="beginner"&abnormal="none"
   https://gymunity.ai/pt_plan -> https://PTServerIP:Port/pt_plan ->
   pt_plan_ok -> https://AdminServerIP:Port/plan_name
   https://gymunity.ai/exercise.html -> https://PTServerIP:Port/exercise ->
   user.pt_log.date, user.pt_log.program = generate_daily_plan () -> set_pt_env ( video, step, chatbot )
   https://AdminServerIP:Port/plus_point

3. 설문지
   사용자 정보 : 성별, 나이, 운동 목표, 운동 수준, 건강 이상
   운동 목표 : 체중 감량, 근육량 증가, 종합 (체중, 체력, 스트레스 해소 등), 기타
   운동 수준 : 초급, 중급, 고급
   건강 이상 : 없음, 당뇨, 심장, 고혈압, 뼈/관절, 빈혈, 기타 => 추가 가이드 (추천 상품)

4. ToDo
   Plan Text 를 클립보드에 복사
   Daily Check > 오늘 운동 프로그램 생성 전 현재 통증 및 부상 물어보기
   Open Local sLLM 선택 : https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard
   응답속도 개선 (Torch 로 GPU 활용)
   운동 부위별 가이드 영상 DB
   운동 부위별 가이드 영상 생성 (`24 하반기 OpenAI Sora 출시)
   affilate

   - API 키 발급 >> https://partners.coupang.com/#affiliate/ws/tools/open-api
   - 쿠팡 API : https://partners.coupang.com/#help/open-api

5. Reference
   VS Code : https://code.visualstudio.com/Download
   Python : https://wikidocs.net/book/1
   Github : https://github.com/
   FastAPI : https://wikidocs.net/book/8531  
   python + mysql : http://pythonstudy.xyz/python/article/202-MySQL-%EC%BF%BC%EB%A6%AC
   [중요] LangChain 강의 : https://www.udemy.com/course/langchain-korean
   랭체인 + 챗봇 튜토리얼 : https://python.langchain.com/docs/use_cases/chatbots/quickstart
   LangChain : https://wikidocs.net/book/14314
   claude-3-opus (현시점 최고성능 LLM) : https://python.langchain.com/docs/integrations/chat/anthropic
   youtube api in langchain : https://python.langchain.com/docs/integrations/tools/youtube
   Ollama : https://python.langchain.com/docs/integrations/llms/ollama

6. schedule
   design
   db 구축 (PT 가이드 생성)
   api 구현
   front 구현
   api server release
