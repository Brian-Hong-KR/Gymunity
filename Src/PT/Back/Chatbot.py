from flask import Flask, render_template, request, jsonify
from langchain.memory import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables.history import RunnableWithMessageHistory

import time, json, re, dotenv, os

dotenv.load_dotenv()

llm = ChatOllama(model="llama2", temperature=0,) 
app = Flask(__name__)

# Admin Open API (필요)
# https://AdminServerIP:Port/plan_name      <- POST ( id, pt_plan )
# https://AdminServerIP:Port/plus_point     <- POST ( id, reward )

# Front                                        Route                                        Action
# https://gymunity.ai/survey.html           -> https://PTServerIP:Port/survey_goal      -> https://gymunity.ai/survey_level.html?id="brian"&gender="male"&age="39"
# https://gymunity.ai/survey_level.html     -> https://PTServerIP:Port/survey_level     -> https://gymunity.ai/survey_abnormal.html?id="brian"&gender="male"&age="39"&level="beginner"
# https://gymunity.ai/survey_abnormal.html  -> https://PTServerIP:Port/survey_abnormal  -> pt_plan = generate_pt_plan ()
#                                                                   https://gymunity.ai/pt_plan.html?id="brian"&gender="male"&age="39"&level="beginner"&abnormal="none"
# https://gymunity.ai/pt_plan.html          -> https://PTServerIP:Port/pt_plan          -> https://AdminServerIP:Port/plan_name 

# https://gymunity.ai/exercise.html         -> https://PTServerIP:Port/exercise         -> 
#                                                                   user.pt_log.date, user.pt_log.program = generate_daily_plan () -> set_pt_env ( video, step, chatbot )
#                                                                   https://AdminServerIP:Port/plus_point


@app.route("/")
def PT(id, survey_answer_3):
    return render_template("Exercise.html")

@app.route("/Survey1", methods=["POST"])
def Survey1(id, survey_answer_1):
    return render_template("Survey2.html")

@app.route("/Survey2", methods=["POST"])
def Survey2(id, survey_answer_2):
    return render_template("Survey3.html")

@app.route("/SurveyDone", methods=["POST"])
def SurveyDone(id, survey_answer_3):
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

#    사용자 정보 : 성별, 나이, 운동 목표, 운동 수준, 건강 이상
#       운동 목표 : 체중 감량, 근육량 증가, 종합 (체중, 체력, 스트레스 해소 등), 기타
#       운동 수준 : 초급, 중급, 고급
#    건강 이상 : 없음, 당뇨, 심장, 고혈압, 뼈/관절, 빈혈, 기타 => 추가 가이드 (추천 상품)

    result = llm.invoke( prompt )

    print ( result )

    return render_template("Plan.html")

@app.route("/RestartSurvey", methods=["POST"])
def RestartSurvey(id):
    return render_template("Survey1.html")

@app.route("/CreateProfile", methods=["POST"])
def CreateProfile(id):
    # request / UserServer / POST / CreateProfile / id, surveys, guide
    return render_template("Main.html")

@app.route("/Excercise", methods=["GET"])
def DailyPlan():
    
    render_template("Exercise.html")
    
    user_level = "beginner"
    user_goal = "fat loss"
   
    plan_prompt = """Create a """ + user_level + """'s home training program for """ + user_goal + """. do not explan. just keyword. you must choose a method from the pool :\n\n pool : """ + str(os.getenv("exercise_list")) + """\n\n output example: ["Push-ups", "Lunges", "Plank", "Burpees"]"""
    
    plan = llm.invoke( plan_prompt )
    print (plan)
    
    matches = re.findall( r"\[(.*?)\]" , str(plan))
    today_plan = eval(matches[0])
      
    with open(os.getenv("unit_guide_file_path"), "r", encoding='utf-8') as f:
        unit_data = json.load(f)

    daily_program = []

    for plan in today_plan:    
        for unit in unit_data:
            if unit.get("unit_name") == plan + " (" + user_level + ")":
                daily_program.append ( unit )

    print ( daily_program )
    
    return daily_program
    

@app.route("/Question", methods=["GET"])
def Question(id, input):
    
    # chain = FindLog (id)

    system_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "Answer in one sentence.",
            ),MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
        ]
    )

    chain = system_prompt | llm

    chat_history = ChatMessageHistory()

    history_chain = RunnableWithMessageHistory(
        chain,
        lambda session_id: chat_history,
        input_messages_key="input",
        history_messages_key="chat_history",
    )
    
    start_time = time.time()

    response = history_chain.invoke(
        {"input": "tell me about you"},
        {"configurable": {"session_id": "unused"}},
    )

    end_time = time.time()

    print ( response )
    print(f"응답 시간 : {end_time - start_time:.1f}초")

    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
    
    
    
