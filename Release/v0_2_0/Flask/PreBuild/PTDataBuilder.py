from langchain.llms import Ollama
import json, time, re

from googletrans import Translator
from youtubesearchpython import VideosSearch

file_path = "pre_build_data.json"

gender_list = ["male", "female"]
age_list = ["young", "old"]
goal_list = ["Body fat reduction", "Muscle gain", "Overall health improvement"]
level_list = ["beginner", "Intermediate", "advanced"]
abnormal_list = ["cardiovascular disease", "musculoskeletal disorders", "respiratory diseases", "no health problems"]

llm = Ollama(model="llama3", temperature=0.1) 

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

                    plan_prompt = f"""You are a personal trainer. Answer the training guide based on the client information. :\n\n
                    The client Information >\n\nGender: {gender}\nAge : {age}\nGoal : {goal}\nExercise Level {level}\nHealth abnormalities: {abnormal}"""
                    result = llm.invoke( plan_prompt )

                    tran = Translator()
                    plan_desc = tran.translate(text=result.replace("\n", "<br>"), src="en", dest="ko").text  

                    program_prompt = f"""Write a home training program for today based on the client information. The result is only output in python list format as shown in the example :\n\The client Information >\n\nGender: {gender}\nAge : {age}\nGoal : {goal}\nExercise Level {level}\nHealth abnormalities: {abnormal}\n\nSample Results >\n\n[ "스트레칭", "버피", "런지", "푸쉬업", "플랭크", "스트레칭"]"""

                    plan = llm.invoke( program_prompt )
                    
                    matches = []
                    matches = re.findall( r"\[(.*?)\]" , str(plan))
                    
                    print (matches)
                    
                    if len(matches) == 0:
                        daily_program = "default"
                    else:
                        daily_program = eval(matches[0])
                        
                        videoList = []
                        for unit_name in daily_program:

                            videosSearch = VideosSearch(f"""홈트레이닝+"{unit_name}"+"{level}"+{gender}+{goal}+{abnormal}""" , limit=1)

                            for video in videosSearch.result()['result']:
                                videoList.append ( video['id'] )

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

