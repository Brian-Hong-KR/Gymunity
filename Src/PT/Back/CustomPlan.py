from langchain_anthropic import ChatAnthropic
import time, json, re, dotenv, os

dotenv.load_dotenv()

llm = ChatAnthropic(
    model_name="claude-3-opus-20240229",
    temperature=0, 
    anthropic_api_key="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", 
)

gender = "Male"
age= "39"
goal = "to lose weight"
level = "beginner"
abnormal = "none"

#    사용자 정보 : 성별, 나이, 운동 목표, 운동 수준, 건강 이상
#       운동 목표 : 체중 감량, 근육량 증가, 종합 (체중, 체력, 스트레스 해소 등), 기타
#       운동 수준 : 초급, 중급, 고급
#    건강 이상 : 없음, 당뇨, 심장, 고혈압, 뼈/관절, 빈혈, 기타 => 추가 가이드 (추천 상품)

prompt = """You are a personal trainer. Answer the training guide based on your client's information. :\n
   Client Information >
   Gender: """ + gender + """\nAge : """ + age + """\nGoal : """ + goal + """\nExercise Level : """ + level + """\nHealth abnormalities: """ + abnormal + """\n\nOUTPUT example >
   1. PT Plan Name : Weight Loss (beginner)
   2. PT Plan Description : 
   3. Additional recommendations (mindset, diet, sleep) : """

result = llm.invoke( prompt )

print ( result )



