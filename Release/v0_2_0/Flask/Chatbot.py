import ollama
import json
import Translator

pre_build_data = []
with open( "./PreBuild/pre_build_data.json" , "r", encoding='utf-8') as f:
    pre_build_data = json.load(f)

def generate_pt_plan (gender, age, goal, level, abnormal):
    for item in pre_build_data:
        if item["gender"] == gender and item["age"] == age and item["goal"] == goal and item["level"] == level and item["abnormal"] == abnormal:
            return item["plan_desc"]
    
    return f"플랜 생성 오류 : {gender} {age} {goal} {level} {abnormal}"
    

def generate_daily_program (gender, age, goal, level, abnormal):
    for item in pre_build_data:
        if item["gender"] == gender and item["age"] == age and item["goal"] == goal and item["level"] == level and item["abnormal"] == abnormal:
            return item["daily_program"], item["videoList"]
    
    return f"플랜 생성 오류 : {gender} {age} {goal} {level} {abnormal}"

def generate_answer (unit_name, question):

    # AWS 서버를 사용하는 경우 False, 로컬 서버를 사용하는 경우 True
    LocalServer = False

    system_prompt = f"""Answer about {unit_name} like a professional trainer in single sentences. """

    if LocalServer is True:
        response = ollama.chat (model='llama3', messages = [{"role":"system","content": system_prompt },{"role":"user","content":question}] )
        return Translator.TranToKorean ( response['message']['content'] )
    else :
        from groq import Groq
        client = Groq(api_key="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", )
        chat_completion = client.chat.completions.create(
            messages=[{"role": "system","content": system_prompt},{"role": "user","content": question }],
            model="llama3-8b-8192",
        )
        return Translator.TranToKorean(chat_completion.choices[0].message.content)


if __name__ == "__main__":
    print ( generate_answer( unit_name="push-ups", question="허리가 아프다") )

