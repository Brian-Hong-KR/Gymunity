from flask import Blueprint, request, jsonify
from youtubesearchpython import VideosSearch
import Chatbot, DataBase

bp = Blueprint('pt_server', __name__, url_prefix='/')

@bp.route('/plan', methods=('POST',))
def plan():
    data = request.get_json()
    gender = data['gender']
    age = data['age']
    goal = data['goal']
    level = data['level']
    abnormal = data['abnormal']

    plan_name = f"플랜명 : {goal} ({level})"
    plan_desc = Chatbot.generate_pt_plan( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal)

    response_data = {
        'plan_name': plan_name,
        'plan_desc': plan_desc
    }

    return jsonify(response_data)

@bp.route('/exercise', methods=('POST',))
def exercise():
    data = request.get_json()
    user_id = data['user_id']
    gender, age, goal, level, abnormal = DataBase.LoadSurveyData(user_id=user_id)

    daily_program = Chatbot.generate_daily_program(gender=gender, age=age, goal=goal, level=level, abnormal=abnormal)
    # DataBase.SavePTLog(user_id = user_id, daily_program=str(daily_program))

    videoList = []

    for unit_name in daily_program:
        videosSearch = VideosSearch("""홈트레이닝 """ + unit_name, limit=1)
        for video in videosSearch.result()['result']:
            videoList.append( video['id'] )

    response_data = {
        'videoList': videoList
    }

    print (response_data)

    return jsonify(response_data)


@bp.route("/question", methods=('POST',))
def chatbot_response():

    data = request.get_json()
    question = data["question"]
    # user_id = data["user_id"]
    # unit_name = data["unit_name"]
    unit_name = "푸쉬업"

    answer = Chatbot.generate_answer(unit_name=unit_name, question=question )

    response_data = {
        'answer': answer,
    }

    # DataBase.SavePTQnA(user_id=user_id, unit_name=unit_name, question=question, answer=answer)

    return jsonify(response_data)

@bp.route('/exercise_done', methods=('POST',))
def exercise_done():
    data = request.get_json()
    user_id = data["user_id"]

    response = DataBase.AddPoint(user_id=user_id, amount=20 )

    response_data = {
        'result': response,
    }

    return jsonify(response_data)

@bp.route('/store', methods=('POST',))
def store():
    user_id = request.form["user_id"]

    gender, age, goal, level, abnormal = DataBase.LoadSurveyData ( user_id )

    product_list = Chatbot.generate_product_list ( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal )

    response_data = {
        'product_list': product_list,
    }

    return jsonify(response_data)





