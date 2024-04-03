from flask import Blueprint, render_template, request
from models import pt, pt_log, pt_qna
import Chatbot
from googletrans import Translator


bp = Blueprint('pt_server', __name__, url_prefix='/')

@bp.route('/')
def home():
    return render_template ( "home.html")

@bp.route('/survey')
def survey():
    return render_template ( "survey.html")

@bp.route('/plan', methods=('POST',))
def plan():    
        
    gender = request.form['gender']
    age = request.form['age']
    goal = request.form['goal']
    level = request.form['level']
    abnormal = request.form['abnormal']

    result = Chatbot.generate_pt_plan( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal)

    tran = Translator()

    plan_desc = tran.translate(text=result, dest="ko").text  
                                                                             
    # pt_unit = pt(
    #     pt_code = 1,
    #     user_code = 23,
    #     gender = gender,
    #     age = age,
    #     goal = goal,
    #     level = level,
    #     abnormal = abnormal,
    #     plan_name = "테스트 입력",
    #     plan_desc = plan_desc,
    # )

    # db.session.add(pt_unit)
    # db.session.commit()
        
    return render_template ( "plan.html", plan_desc = plan_desc)


@bp.route('/survey_done', methods=('POST',))
def survey_done():
    return render_template ( "register.html")

@bp.route('/survey_reset', methods=('POST',))
def survey_reset():
    return render_template ( "survey.html")

@bp.route('/exercise')
def exercise():
    return render_template ( "pt.html")

@bp.route('/question')
def question():
    # Chatbot.generate_pt_plan( gender=gender, age=age, goal=goal, level=level, abnormal=abnormal)
    return render_template ( "pt.html")

# @bp.get("/pt_data/<int:user_code>/")
# def pt_data (user_code):
#   return pt.query.get_or_404(user_code)

# @bp.get("/pt_log_data/<int:user_code>/")
# def pt_log_data (user_code):
#     return pt_log.query.get_or_404(user_code)
