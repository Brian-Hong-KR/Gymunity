1. 챗봇 서버 개발 요구사항
   On-Device AI 로 구현 (무료 서비스)
   최초 : 사전 설문 (웹) -> GET CustomPlan (100일 운동 프로그램) -> POST Profile (ID, Survey, CustomPlan )
   부팅 : GET DailyPlan (ID -> program, prompt, video_url)
   오운완 : POST DailyExercise (ID, Date, 운동량)

2. 영상 서버 개발 요구사항

3. ToDo
   Open Local sLLM 선택 : https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard
   응답속도 개선 (Torch 로 GPU 활용)
   운동 부위별 가이드 영상 DB

4. Reference
   랭체인 + 챗봇 튜토리얼 : https://python.langchain.com/docs/use_cases/chatbots/quickstart
