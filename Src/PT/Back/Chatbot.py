from flask import Flask, render_template, request, jsonify
from langchain_community.chat_models import ChatOllama
import json, re, dotenv, os

dotenv.load_dotenv()

llm = ChatOllama(model="llama2", temperature=0,) 
app = Flask(__name__)

unit_data = []
with open(os.getenv("unit_guide_file_path"), "r", encoding='utf-8') as f:
    unit_data = json.load(f)

@app.route("/get_pt_plan", methods=["GET"])
def get_pt_plan ():
    return "get pt.( plan_name )"

@app.route("/get_pt_plan_desc", methods=["GET"])
def get_pt_plan_desc ():
    return "get pt.( plan_desc )"

@app.route("/get_pt_log", methods=["GET"])
def get_pt_log ():
    return "get pt_log.( daily_program, datetime )"

@app.route("/pt_plan", methods=["POST"])
def pt_plan ():
    gender = "Male"
    age= "39"
    goal = "to lose weight"
    level = "beginner"
    abnormal = "none"

    prompt = """You are a personal trainer. Answer the training guide based on your client's information. :\n
    Client Information >
    Gender: """ + gender + """\nAge : """ + age + """\nGoal : """ + goal + """\nExercise Level : """ + level + """\nHealth abnormalities: """ + abnormal + """\n\nOUTPUT example >
    1. PT Plan Name : Weight Loss (beginner)
    2. PT Plan Description : 
    3. Additional recommendations (mindset, diet, sleep) : """

    result = llm.invoke( prompt )

    print ( result )

    # create pt.( user_code, gender, age, goal, level, abnormal, plan_name, plan_desc)
    
    return render_template("Plan.html")

@app.route("/exercise")
def exercise ():
   
    # get pt.( plan_name )
    
    user_level = "beginner"
    user_goal = "fat loss"
   
    plan_prompt = """Create a """ + user_level + """'s home training program for """ + user_goal + """. do not explan. just keyword. you must choose a method from the pool :\n\n pool : """ + str(os.getenv("exercise_list")) + """\n\n output example: ["Push-ups", "Lunges", "Plank", "Burpees"]"""
    
    plan = llm.invoke( plan_prompt )
    print (plan)
    
    matches = re.findall( r"\[(.*?)\]" , str(plan))
    today_plan = eval(matches[0])

    daily_program = []

    for plan in today_plan:    
        for unit in unit_data:
            if unit.get("unit_name") == plan + " (" + user_level + ")":
                daily_program.append ( unit )

    print ( daily_program )
    
    # create pt_log.( user_code, daily_program)
    
    return render_template("exercise.html")


@app.route("/Question", methods=["GET"])
def Question(unit_name, question):
    
    training_guide = ""

    for unit in unit_data:
        if unit.get("unit_name") == unit_name:
            training_guide = unit.get("unit_guide")
   
    prompt = """You are a personal trainer. Answer the your client's question based on training guide :\n\n your client's question : """ + question + """\n\ntraining guide : \n""" + training_guide

    response = llm.invoke (prompt)
    
    # create pt_qna.( unit_name, question, answer )

    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
    
    
    
