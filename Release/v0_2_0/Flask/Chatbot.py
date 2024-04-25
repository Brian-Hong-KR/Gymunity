import ollama
import json
import Translator

pre_build_data = []
with open( "./PreBuild/pre_build_data.json" , "r", encoding='utf-8') as f:
    pre_build_data = json.load(f)

def generate_pt_plan (gender, age, goal, level, abnormal):
    for item in pre_build_data:
        if item["gender"] == gender and item["age"] == age and item["goal"] == goal and item["level"] == level and item["abnormal"] == abnormal:
            return item["plan_desc"]
    
    return f"플랜 생성 오류 : {gender} {age} {goal} {level} {abnormal}"
    

def generate_daily_program (gender, age, goal, level, abnormal):
    for item in pre_build_data:
        if item["gender"] == gender and item["age"] == age and item["goal"] == goal and item["level"] == level and item["abnormal"] == abnormal:
            return item["videoList"]
    
    return f"플랜 생성 오류 : {gender} {age} {goal} {level} {abnormal}"

def generate_answer (unit_name, question):
    response = ollama.chat (model='llama3', messages = [{"role":"system","content": f"""Answer about {unit_name} like a professional trainer. """},{"role":"user","content":question}] )
    return Translator.TranToKorean ( response['message']['content'] )


if __name__ == "__main__":
    print ( generate_answer( unit_name="push-ups", question="허리가 아프다") )

