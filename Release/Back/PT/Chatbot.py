from langchain.llms import Ollama
import json, re

import dotenv, os
f = dotenv.find_dotenv()
dotenv.load_dotenv(f)
file_path = os.environ["pt_unit_file_path"]
exercise_list = os.environ["exercises"]
exercises = eval (exercise_list)
print ( type(exercises) )

llm = Ollama(model="neural-chat", temperature=0.5) 

unit_data = []
with open( file_path , "r", encoding='utf-8') as f:
    unit_data = json.load(f)

def generate_pt_plan (gender, age, goal, level, abnormal):

    prompt = """You are a personal trainer. Answer the training guide based on your client's information. :\n
    Client Information >
    Gender: """ + gender + """\nAge : """ + age + """\nGoal : """ + goal + """\nExercise Level : """ + level + """\nHealth abnormalities: """ + abnormal + """\n\nOUTPUT example >
    1. PT Plan Name : Weight Loss (beginner)
    2. PT Plan Description : 
    3. Additional recommendations (mindset, diet, sleep) : """

    result = llm.invoke( prompt )

    # TODO : From pt_plan.json

    plan_name = "임의 플랜명"
    plan_desc = result

    return plan_name, plan_desc

def generate_daily_program (goal, level):
    prompt = """Create a """ + level + """'s home training program for """ + goal + """. do not explan. just keyword. you must choose a method from the pool :\n\n pool : """ + str( exercises ) + """\n\n output example: ["Push-ups", "Lunges", "Plank", "Burpees"]"""
    
    plan = llm.invoke( prompt )
    print (plan)
    
    matches = re.findall( r"\[(.*?)\]" , str(plan))
    today_plan = eval(matches[0])

    daily_program = []
    
    for plan in today_plan:    
        for unit in unit_data:
            if unit.get("unit_name") == plan + " " + level:
                daily_program.append ( unit )

    return daily_program
    
def generate_answer (unit_name, question):
    
    training_guide = ""

    for unit in unit_data:
        if unit.get("unit_name") == unit_name:
            training_guide = unit.get("unit_guide")
   
    prompt = """You are a personal trainer. Answer the your client's question based on training guide :\n\n your client's question : """ + question + """\n\ntraining guide : \n""" + training_guide

    response = llm.invoke (prompt)
    
    return response
