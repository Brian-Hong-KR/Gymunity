from flask import Blueprint, render_template, request
from youtubesearchpython import VideosSearch
import Chatbot, DataBase
import datetime

bp = Blueprint('pt_server', __name__, url_prefix='/')

@bp.route('/')
def home():
    return render_template("home.html")

@bp.route('/survey')
def survey():
    return render_template("survey.html")

@bp.route('/survey_done', methods=('POST',))
def survey_done():
    # TODO : render_template("register.html")
    gender = "female"
    age = "old"
    goal = "Muscle gain"
    level = "beginner"
    abnormal = "no health problems"

    daily_program = Chatbot.generate_daily_program( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal )

    video_list = ""
        
    for unit_name in daily_program:
        videosSearch = VideosSearch("""홈트레이닝 """ + unit_name , limit=1)

        for video in videosSearch.result()['result']:
            video_list += video['id'] + ","

    DataBase.SavePTLog(daily_program=str(daily_program), done_datetime=datetime.datetime.today())

    return render_template ( "pt.html", daily_program=daily_program, video_list=video_list)


@bp.route('/survey_reset')
def survey_reset():
    return render_template("survey.html")


@bp.route('/plan', methods=('POST',))
def plan():
    gender = request.form['gender']
    age = request.form['age']
    goal = request.form['goal']
    level = request.form['level']
    abnormal = request.form['abnormal']

    plan_name = f"플랜명 : {goal} ({level})"
    plan_desc = Chatbot.generate_pt_plan( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal)

    return render_template ( "plan.html", plan_name=plan_name, plan_desc = plan_desc)

@bp.route('/exercise')
def exercise( user_id ):
    # TODO 
    gender, age, goal, level, abnormal = DataBase.LoadSurveyData  (user_id )

    daily_program = Chatbot.generate_daily_program( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal )

    video_list = ""
    
    for unit_name in daily_program:
        videosSearch = VideosSearch(f"""홈트레이닝 {unit_name} {age} {gender} {goal} {level} {abnormal}""", limit = 1)

        for video in videosSearch.result()['result']:
            video_list += video['id'] + ","

    DataBase.SavePTLog(daily_program=daily_program, done_datetime=datetime.datetime.today())

    return render_template ( "pt.html", video_list=video_list)

@bp.route("/question", methods=["POST"])
def chatbot_response():
    unit_name = request.form["unit_name"]    
    question = request.form["question"]    
    gender = request.form['gender']
    age = request.form['age']
    goal = request.form['goal']
    level = request.form['level']
    abnormal = request.form['abnormal']
    
    answer = Chatbot.generate_answer(unit_name=unit_name, question=question, gender=gender, age=age, goal=goal, level=level, abnormal=abnormal )
    
    DataBase.SavePTQnA(unit_name=unit_name, question=question, answer=answer)
    
    return answer

@bp.route('/exercise_done', methods=["POST"])
def exercise_done():
    data = request.get_json()
    user_id = data["user_id"]
    print ("2. 오운완 ID from JSON : ", user_id)

    DataBase.AddPoint(user_id=user_id, amount=20 )
    
    return True
