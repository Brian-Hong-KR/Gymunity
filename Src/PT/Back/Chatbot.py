from flask import Flask, render_template, request, jsonify
from langchain.memory import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables.history import RunnableWithMessageHistory
import time, json, re, dotenv, os

dotenv.load_dotenv()

llm = ChatOllama(model="gemma:2b", temperature=0,) 
app = Flask(__name__)

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
    # GeneratePlan (surveys)
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
    
    
    
