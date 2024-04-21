import ollama
import json, re
import dotenv, os

f = dotenv.find_dotenv()
dotenv.load_dotenv(f)
pt_plan_file_path = os.environ["pt_plan_file_path"]
daily_plan_file_path = os.environ["daily_plan_file_path"]
product_list_file_path = os.environ["product_list_file_path"]

pt_guide_list = []
with open( pt_plan_file_path , "r", encoding='utf-8') as f:
    pt_guide_list = json.load(f)

daily_guide_list = []
with open( daily_plan_file_path , "r", encoding='utf-8') as f:
    daily_guide_list = json.load(f)

product_list = []
with open( product_list_file_path , "r", encoding='utf-8') as f:
    product_list = json.load(f)

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

def generate_answer (unit_name, question):
    response = ollama.chat (model='llama3', messages = [{"role":"system","content": f"""Answer about {unit_name} like a professional trainer. """},{"role":"user","content":question}] )
    return response['message']['content']
    
if __name__ == "__main__":
    print ( generate_answer( unit_name="push-ups", question="허리가 아프다") )

