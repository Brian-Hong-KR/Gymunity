from flask import Blueprint, render_template, request
import Chatbot, DataBase
import datetime

bp = Blueprint('pt_server', __name__, url_prefix='/')

@bp.route('/plan', methods=('POST',))
def plan():
    gender = request.form['gender']
    age = request.form['age']
    goal = request.form['goal']
    level = request.form['level']
    abnormal = request.form['abnormal']

    plan_name, plan_desc = Chatbot.generate_pt_plan( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal)
        
    return render_template ( "plan.html", plan_name=plan_name, plan_desc = plan_desc)

@bp.route('/exercise')
def exercise():
    goal = request.form["goal"]
    level = request.form["level"]

    daily_program = Chatbot.generate_daily_program(goal="diet", level = "beginner")

    video_list = ""
    for unit in daily_program:
        video_list += unit.get("unit_video") + ","
    
    video_list = video_list[:-2] 
    # TODO : 마지막 쉼표 제거?

    DataBase.SavePTLog(daily_program=daily_program, done_datetime=datetime.datetime.today())
    # TODO : user_id

    return render_template ( "pt.html", video_list=video_list)

@bp.route("/question", methods=["POST"])
def chatbot_response():
    unit_name = request.form["unit_name"]    
    question = request.form["question"]
    
    answer = Chatbot.generate_answer(unit_name=unit_name, question=question)
    
    DataBase.SavePTQnA(unit_name=unit_name, question=question, answer=answer)
    
    return answer

@bp.route('/exercise_done')
def exercise_done():
    user_id = request.form["user_id"]  
    DataBase.AddPoint(user_id=user_id, amount=20 )
    # TODO : User ID