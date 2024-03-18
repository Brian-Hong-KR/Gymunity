1. 챗봇 서버 개발 요구사항
   On-Device AI 로 구현 (무료 서비스)
   최초 : 사전 설문 (웹) -> GET CustomPlan (100일 운동 프로그램) -> POST Profile (ID, Survey, CustomPlan )
   부팅 : GET DailyPlan (ID -> program, prompt, video_url)

2. 영상 서버 개발 요구사항
   Step : 영상 재생, 재생 완료시 Next Step
   오운완 : POST DailyExercise (ID, Date, 운동량)

3. ToDo
   Open Local sLLM 선택 : https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard
   응답속도 개선 (Torch 로 GPU 활용)
   운동 부위별 가이드 영상 DB
   운동 부위별 가이드 영상 생성 (`24 하반기 OpenAI Sora 출시)

4. Reference
   랭체인 + 챗봇 튜토리얼 : https://python.langchain.com/docs/use_cases/chatbots/quickstart
   claude-3-opus (현시점 최고성능 LLM) : https://python.langchain.com/docs/integrations/chat/anthropic
   youtube api in langchain : https://python.langchain.com/docs/integrations/tools/youtube
   python + mysql : http://pythonstudy.xyz/python/article/202-MySQL-%EC%BF%BC%EB%A6%AC
