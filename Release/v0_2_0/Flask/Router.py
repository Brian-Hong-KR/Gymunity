from flask import Blueprint, request, jsonify
import Chatbot, DataBase

bp = Blueprint('pt_server', __name__, url_prefix='/')

@bp.route('/exercise', methods=('POST',))
def exercise():
    data = request.get_json()
    user_id = data['user_id']

    gender, age, goal, level, abnormal = DataBase.LoadSurveyData(user_id=user_id)

    daily_program, videoList = Chatbot.generate_daily_program(gender=gender, age=age, goal=goal, level=level, abnormal=abnormal)

    DataBase.SavePTLog(user_id = user_id, daily_program=str(daily_program))

    response_data = {
        'daily_program': daily_program,
        'videoList': videoList
    }

    print (response_data)

    return jsonify(response_data)


@bp.route("/question", methods=('POST',))
def chatbot_response():

    data = request.get_json()
    unit_name = data["unit_name"]
    user_id = data["user_id"]
    question = data["question"]

    answer = Chatbot.generate_answer(unit_name=unit_name, question=question )

    print(answer)

    response_data = {
        'answer': answer,
    }

    DataBase.SavePTQnA(user_id=user_id, unit_name=unit_name, question=question, answer=answer)

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






