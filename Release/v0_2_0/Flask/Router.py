from flask import Blueprint, render_template, request, jsonify
from youtubesearchpython import VideosSearch
import Chatbot, DataBase

bp = Blueprint('pt_server', __name__, url_prefix='/')

@bp.route('/test')
def test():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)
#
# @bp.route('/survey')
# def survey():
#     return render_template("survey.html")

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

    DataBase.SavePTLog(daily_program=str(daily_program))

    # return render_template ( "pt.html", daily_program=daily_program, video_list=video_list)
    return daily_program, video_list

#
# @bp.route('/survey_reset')
# def survey_reset():
#     return render_template("survey.html")


@bp.route('/plan', methods=('POST',))
def plan():
    gender = request.form['gender']
    age = request.form['age']
    goal = request.form['goal']
    level = request.form['level']
    abnormal = request.form['abnormal']

    plan_name = f"플랜명 : {goal} ({level})"
    plan_desc = Chatbot.generate_pt_plan( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal)

    # return render_template ( "plan.html", plan_name=plan_name, plan_desc = plan_desc)
    return plan_name, plan_desc

@bp.route('/exercise')
def exercise( user_id ):
    # TODO : Survey_done -> 다른 page 에서 exercise POST 로 호출

    gender, age, goal, level, abnormal = DataBase.LoadSurveyData  (user_id )

    daily_program = Chatbot.generate_daily_program( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal )

    video_list = ""
    
    for unit_name in daily_program:
        videosSearch = VideosSearch(f"""홈트레이닝 {unit_name} {age} {gender} {goal} {level} {abnormal}""", limit = 1)

        for video in videosSearch.result()['result']:
            video_list += video['id'] + ","

    DataBase.SavePTLog(daily_program=daily_program)

    # return render_template ( "pt.html", daily_program=daily_program, video_list=video_list)
    return daily_program, video_list

@bp.route("/question", methods=["POST"])
def chatbot_response():
    question = request.form["msg"]    
    user_id = request.form["user_id"]    
    unit_name = request.form["unit_name"] 

    answer = Chatbot.generate_answer(unit_name=unit_name, question=question )

    DataBase.SavePTQnA(user_id=user_id, unit_name=unit_name, question=question, answer=answer)

    return answer

@bp.route('/exercise_done', methods=["POST"])
def exercise_done():
    data = request.get_json()
    user_id = data["user_id"]
    print ("2. 오운완 ID from JSON : ", user_id)

    DataBase.AddPoint(user_id=user_id, amount=20 )
    
    return True

@bp.route('/store', methods=["POST"])
def store():
    user_id = request.form["user_id"] 
    gender, age, goal, level, abnormal = DataBase.LoadSurveyData ( user_id )
    
    # TODO : 최신 정보 반영 및 Disable 기능
    # lastest_program = DataBase.load_lastest_daily_program ( user_id=user_id)
    # lastest_questions = DataBase.load_lastest_qna (user_id=user_id)
    # disable_product = DataBase.load_disable_product (user_id=user_id)

    product_list = Chatbot.generate_product_list ( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal )
    
    print (product_list)

    # return render_template ( "store.html", product_list=product_list)
    return product_list





