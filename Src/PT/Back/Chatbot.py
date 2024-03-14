from flask import Flask, render_template, request, jsonify
from langchain.memory import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables.history import RunnableWithMessageHistory
import time

llm = ChatOllama(model="gemma:2b") 
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

@app.route("/DailyPlan", methods=["GET"])
def DailyPlan():
    # request / UserServer / GET / ReadProfileAll / id 
    # load chat_history
    # GenerateExerciseStep (url_db, exercise_log, chat_history)
    steps = [1, 2]
    
    return steps

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
    # GEMMA 2B 성능 : 노트북 : 6.2 / GPU : 
    
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
    
    
    
