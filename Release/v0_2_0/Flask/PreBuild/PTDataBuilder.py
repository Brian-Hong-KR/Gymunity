import ollama
import json, time
import requests, uuid, json

from youtubesearchpython import VideosSearch
import requests, uuid, json

def TranToKorean(message):
    # Gymunity 외 용도로 사용금지
    request = requests.post(
        "https://api.cognitive.microsofttranslator.com/translate",
        params={'api-version': '3.0', 'from': 'en', 'to': 'ko', },
        headers={
            'Ocp-Apim-Subscription-Key': "b3a91799f02249d2bda84079cab15202",
            'Ocp-Apim-Subscription-Region': "koreacentral",
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4()),
        },
        json=[{'text': message}])

    response = request.json()

    return response[0].get("translations")[0].get("text")

file_path = "pre_build_data.json"

gender_list = ["male", "female"]
age_list = ["young", "old"]
goal_list = ["Body fat reduction", "Muscle gain", "Overall health improvement"]
level_list = ["beginner", "Intermediate", "advanced"]
abnormal_list = ["cardiovascular disease", "musculoskeletal disorders", "respiratory diseases", "no health problems"]

start_time = time.time()

with open(file_path, "w", encoding='utf-8') as f:
    f.write("[\n")

progress = 0
total = len (gender_list) * len (age_list) * len (goal_list) * len (level_list) * len (abnormal_list) 

for gender in gender_list:
    for age in age_list:
        for goal in goal_list:
            for level in level_list:
                for abnormal in abnormal_list:
                    
                    step_start_time = time.time()

                    response = ollama.chat(model='llama3', messages=[
                        {"role": "system", "content": f"""Based on user's information, Create a comprehensive home workout plan like a professional trainer."""},
                        {"role": "user", "content": f"""My Information > Gender: {gender}\nAge : {age}\nGoal : {goal}\nExercise Level {level}\nHealth abnormalities: {abnormal}"""}
                    ])

                    plan_desc = response['message']['content']
                    plan_desc_ko = TranToKorean(plan_desc)

                    response = ollama.chat(model='llama3', format="json", messages=[
                        {"role": "system", "content": """Create today's home workout program. List only the names of the exercises, like this example: {"Result" : ["Jogging (5-10 minutes)", "Dynamic stretches","squats (3set x 10 rep)","Lunges (2set x 10 rep)","Push-ups","Planks","Static stretches"]}"""},
                        {"role": "user", "content": f"""My Information > Gender: {gender}\nAge : {age}\nGoal : {goal}\nExercise Level {level}\nHealth abnormalities: {abnormal}"""}
                    ])

                    program = response['message']['content']
                    daily_program_json = json.loads (program)
                    first_key = next(iter(daily_program_json))
                    daily_program = daily_program_json[first_key]

                    videoList = []
                    for unit_name in daily_program:
                        if "(" in unit_name:
                            unit_name = unit_name.split('(')[0]

                        search_str = f"""홈트레이닝 {level} {unit_name} 한국어"""
                        search_str_ko = TranToKorean(search_str)

                        videosSearch = VideosSearch(search_str_ko ,limit=1)
                        for video in videosSearch.result()['result']:
                            videoList.append(video['id'])

                    new_data = {
                        "gender": gender,
                        "age" : age,
                        "goal" : goal,
                        "level" : level,
                        "abnormal" : abnormal,
                        "plan_name" : goal + " " + level,
                        "plan_desc" : plan_desc_ko,
                        "daily_program" : daily_program,
                        "videoList" : videoList,
                    }

                    progress += 1                    
                    with open( file_path, "a", encoding='utf-8') as f:
                        json.dump (new_data, f, indent = 4)
                        if progress < total :
                            f.write(",\n")                    
                    
                    print ("Step : " + str(progress) + " / " + str(total) )
                    print (" time : ", time.time() - step_start_time)

with open(file_path, "a", encoding='utf-8') as f:
    f.write("]")
    
print ("DONE !\n    Total Elapsed Time : ", time.time() - start_time)

