from langchain.llms import Ollama
import time

test_temp = 0.5

llm_1 = Ollama(model="neural-chat", temperature=test_temp)
llm_2 = Ollama(model="wizardlm2", temperature=test_temp)
llm_3 = Ollama(model="mistral", temperature=test_temp)

# 후보 리스트
# gemma, llama2, 


question_list = ["넌 뭘 대답할 수 있어?", "허리쪽이 아픕니다.", "무릎이 아픈데"]


def generate_answer (model, question):

    prompt = f"""You are a personal trainer and your client has the following question about squats. Answer in 3 colloquial Korean sentences.\n\nClient's question : {question}"""

    response = model.invoke (prompt)
    
    return response
    
if __name__ == "__main__":

    print ("""Temp : """, test_temp)

    for question_unit in question_list:
        print ("""Q : """, question_unit)

        step_start_time = time.time()
        answer = generate_answer (llm_1, question_unit)
        print ("""1 : """, time.time()-step_start_time, answer)

        step_start_time = time.time()
        answer = generate_answer (llm_2, question_unit)
        print ("""2 : """, time.time()-step_start_time, answer)

        step_start_time = time.time()
        answer = generate_answer (llm_3, question_unit)
        print ("""3 : """, time.time()-step_start_time, answer)
