from langchain.llms import Ollama
import json, re

import dotenv, os
f = dotenv.find_dotenv()
dotenv.load_dotenv(f)
pt_plan_file_path = os.environ["pt_plan_file_path"]
daily_plan_file_path = os.environ["daily_plan_file_path"]

llm = Ollama(model="neural-chat", temperature=0.5) 

pt_guide_list = []
with open( pt_plan_file_path , "r", encoding='utf-8') as f:
    pt_guide_list = json.load(f)

daily_guide_list = []
with open( daily_plan_file_path , "r", encoding='utf-8') as f:
    daily_guide_list = json.load(f)

def generate_pt_plan (gender, age, goal, level, abnormal):

    for item in pt_guide_list:
        if item["gender"] == gender and item["age"] == age and item["goal"] == goal and item["level"] == level and item["abnormal"] == abnormal:
            return item["plan_desc"]
    
    return f"플랜 생성 오류 : {gender} {age} {goal} {level} {abnormal}"
    

def generate_daily_program (gender, age, goal, level, abnormal):
    for item in daily_guide_list:
        if item["gender"] == gender and item["age"] == age and item["goal"] == goal and item["level"] == level and item["abnormal"] == abnormal:
            return item["daily_program"]
    
    return f"플랜 생성 오류 : {gender} {age} {goal} {level} {abnormal}"

def generate_answer (unit_name, question, gender, age, goal, level, abnormal):

    prompt = f"""You are a personal trainer. Answer about {unit_name} based on client's information in 2 sentences. : :\n\n client's question >\n{question}\n\n \nClient Information >\nGender: {gender}\nAge : {age}\nGoal : {goal}\nExercise Level : {level}\nHealth abnormalities: {abnormal}"""

    response = llm.invoke (prompt)
    
    return response
