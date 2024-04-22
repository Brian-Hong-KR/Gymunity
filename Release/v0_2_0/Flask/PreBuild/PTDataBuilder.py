import ollama
import json, time, re
from youtubesearchpython import VideosSearch

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
                    #
                    # response = ollama.chat(model='llama3', messages=[
                    #     {"role": "system", "content": f"""Based on user's information, Create a comprehensive home workout plan like a professional trainer."""},
                    #     {"role": "user", "content": f"""My Information > Gender: {gender}\nAge : {age}\nGoal : {goal}\nExercise Level {level}\nHealth abnormalities: {abnormal}"""}
                    # ])
                    #
                    # plan_desc = response['message']['content']
                    #
                    # print ("plan : ", plan_desc)

                    response = ollama.chat(model='llama3', format="python", messages=[
                        {"role": "system", "content": """Create today's home workout program. List only the names of the exercises, like this example: ["Dynamic stretches","squats","Lunges","Push-ups","Planks","Static stretches"]"""},
                        {"role": "user", "content": f"""My Information > Gender: {gender}\nAge : {age}\nGoal : {goal}\nExercise Level {level}\nHealth abnormalities: {abnormal}"""}
                    ])

                    print ( response['message']['content'] )

                    # videoList = []
                    # for unit_name in daily_program:
                    #
                    #     videosSearch = VideosSearch(f"""홈트레이닝+"{unit_name}"+"{level}"+{gender}+{goal}+{abnormal}""", limit=1)
                    #
                    #     for video in videosSearch.result()['result']:
                    #         videoList.append ( video['id'] )
                    #
                    # print (videoList)

                    new_data = {
                        "gender": gender,
                        "age" : age,
                        "goal" : goal,
                        "level" : level,
                        "abnormal" : abnormal,
                        "plan_name" : goal + " " + level,
                        "plan_desc" : plan_desc,
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

