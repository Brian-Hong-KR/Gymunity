from langchain.llms import Ollama
import time

test_temp = 0.2

llama3 = Ollama(model="llama3", temperature=test_temp)

question_list = ["넌 뭘 대답할 수 있어?", "허리쪽이 아픕니다.", "무릎이 아픈데"]


def generate_answer(model, question):
    prompt = f"""You are a personal trainer and your client has the following question about squats. Answer in 3 colloquial Korean sentences.\n\nClient's question : {question}"""

    response = model.invoke(prompt)

    return response

# sudo systemctl restart ollama.service

if __name__ == "__main__":

    print("""Temp : """, test_temp)

    for question_unit in question_list:
        print("""Q : """, question_unit)

        step_start_time = time.time()
        answer = generate_answer(llama3, question_unit)
        print("""\nllama3 : """, time.time() - step_start_time)
        print(answer)

        # step_start_time = time.time()
        # answer = generate_answer(gemma, question_unit)
        # print("""\ngemma : """, time.time() - step_start_time, answer)
        # print(answer)

        #
        # step_start_time = time.time()
        # answer = generate_answer(mistral, question_unit)
        # print("""\nmistral : """, time.time() - step_start_time)
        # print(answer)
        #
        # # step_start_time = time.time()
        # # answer = generate_answer(neural_chat, question_unit)
        # # print("""\nneural-chat : """, time.time() - step_start_time)
        # # print (answer)
        #
        # step_start_time = time.time()
        # answer = generate_answer(phi, question_unit)
        # print("""\nphi : """, time.time() - step_start_time, answer)
        #
        # # step_start_time = time.time()
        # # answer = generate_answer(solar, question_unit)
        # # print("""\nsolar : """, time.time() - step_start_time)
        # # print(answer)
