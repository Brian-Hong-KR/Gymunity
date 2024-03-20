1. 챗봇 서버 개발 요구사항
   On-Device AI 로 구현 (무료 서비스)
   Step : 영상 재생, 재생 완료시 Next Step

   1-1. (A to P) 로그인

   - signup.html 에서 로그인 후 survey.html 호출 파라미터 ( uid, gender, birth)
   - 예시 : https://gymunity.ai/pt/survey.html?user_id=abc&gender=m&birth=19900202

   1-2. (P to A) 설문 완료

   - survey.html 에서 설문 완료 후 main.html 호출 파라미터 ( uid, pt_plan )
   - 예시 : https://gymunity.ai/main.html?user_id=abc&plan_name=다이어트

   1-3. (P to A) 오늘 운동 완료

   - exercise.html 에서 운동 완료 후 POST plus_point ( uid, count )
   - 향후 고려할 사항 : 암호화 필요

2. ToDo
   Plan Text 를 클립보드에 복사
   Daily Check > 오늘 운동 프로그램 생성 전 현재 통증 및 부상 물어보기
   Open Local sLLM 선택 : https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard
   응답속도 개선 (Torch 로 GPU 활용)
   운동 부위별 가이드 영상 DB
   운동 부위별 가이드 영상 생성 (`24 하반기 OpenAI Sora 출시)
   affilate

   - API 키 발급 >> https://partners.coupang.com/#affiliate/ws/tools/open-api
   - 쿠팡 API : https://partners.coupang.com/#help/open-api

3. Reference
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
