from flask import Flask, render_template, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import config

from langchain_community.chat_models import ChatOllama
from langchain.llms import Ollama
import json, re, dotenv, os
    
db = SQLAlchemy()
migrate = Migrate()

app = Flask(__name__, template_folder='templates')

app.config.from_object(config)

db.init_app(app)
migrate.init_app(app, db)

class pt(db.Model):
    pt_code = db.Column(db.Integer, primary_key=True) 
    user_code = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    age = db.Column(db.String(50), nullable=False)
    goal = db.Column(db.String(50), nullable=False)
    level = db.Column(db.String(50), nullable=False)
    abnormal = db.Column(db.String(150), nullable=False)
    plan_name = db.Column(db.String(100), nullable=False)
    plan_desc = db.Column(db.Text(), nullable=False)

class pt_log(db.Model):
    pt_log_code = db.Column(db.Integer, primary_key=True)
    pt_code = db.Column(db.Integer, db.ForeignKey('pt.pt_code', ondelete='CASCADE'))
    daily_program = db.Column(db.Text(), nullable=False)
    done_datetime = db.Column(db.DateTime(), nullable=False)
    pt = db.relationship('pt', backref=db.backref('pt_set'))
    
class pt_qna(db.Model):
    qna_code = db.Column(db.Integer, primary_key=True)
    unit_name = db.Column(db.String(50), nullable=False)
    question = db.Column(db.Text(), nullable=False)
    anwer = db.Column(db.Text(), nullable=False)

llm = Ollama(model="neural-chat", temperature=0.5) 
chat = ChatOllama(model="neural-chat", temperature=0.5) 

guide_data = []
with open( "./PT/Data/pt_unit.json", "r", encoding='utf-8') as f:
    guide_data = json.load(f)

@app.route('/')
def home():
    return render_template ( "home.html")

@app.route('/survey', methods=('POST',))
def survey():
    return render_template ( "survey.html")

@app.route('/plan', methods=('POST',))
def plan():    
        
    gender = request.form['gender']
    age = request.form['age']
    goal = request.form['goal']
    level = request.form['level']
    abnormal = request.form['abnormal']

    prompt = """You are a personal trainer. Answer the training guide based on your client's information. :\n
    Client Information >
    Gender: """ + str(gender) + """\nAge : """ + str(age) + """\nGoal : """ + str(goal) + """\nExercise Level : """ + str(level) + """\nHealth abnormalities: """ + str(abnormal) + """\n\nOUTPUT example >
    1. PT Plan Name : Weight Loss (beginner)
    2. PT Plan Description : 
    3. Additional recommendations (mindset, diet, sleep) : """

    # result = llm.invoke( prompt )
    result = prompt
    
    pt_unit = pt(
        pt_code = 1,
        user_code = 23,
        gender = gender,
        age = age,
        goal = goal,
        level = level,
        abnormal = abnormal,
        plan_name = "테스트 입력",
        plan_desc = str(result),
    )

    # db.session.add(pt_unit)
    # db.session.commit()
        
    return render_template ( "plan.html", plan_desc = str(result))


@app.route('/survey_done', methods=('POST',))
def survey_done():
    return render_template ( "exercise.html")

@app.route('/survey_reset', methods=('POST',))
def survey_reset():
    return render_template ( "survey.html")

@app.route('/exercise')
def exercise():
    return render_template ( "exercise.html")

@app.get("/pt_data/<int:user_code>/")
def pt_data (user_code):
  return pt.query.get_or_404(user_code)

@app.get("/pt_log_data/<int:user_code>/")
def pt_log_data (user_code):
    return pt_log.query.get_or_404(user_code)

if __name__ == '__main__':    
    app.run( debug = True )
    