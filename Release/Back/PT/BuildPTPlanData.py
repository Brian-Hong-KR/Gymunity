from langchain.llms import Ollama
import json, time
from googletrans import Translator

import dotenv, os
f = dotenv.find_dotenv()
dotenv.load_dotenv(f)
file_path = os.environ["pt_plan_file_path"]
exercises = os.environ["exercises"]

exercise_list = eval (exercises)
gender_list = ["male", "female"]
age_list = ["young", "old"]

goal_list = ["Body fat reduction", "Muscle gain", "Overall health improvement"]
level_list = ["beginner", "Intermediate", "advanced"]

abnormal_list = ["cardiovascular disease", "musculoskeletal disorders", "respiratory diseases", "no health problems"]

llm = Ollama(model="neural-chat", temperature=0.5) 

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

                    prompt = f"""You are a personal trainer. Answer the training guide based on your client's information. :\n\n
                    Client Information >\nGender: {gender}\nAge : {age}\nGoal : {goal}\nExercise Level {level}\nHealth abnormalities: {abnormal}"""

                    result = llm.invoke( prompt )

                    tran = Translator()
                    plan_desc = tran.translate(text=result.replace("\n", "<br>"), src="en", dest="ko").text  

                    new_data = {
                        "gender": gender,
                        "age" : age,
                        "goal" : goal,
                        "level" : level,
                        "abnormal" : abnormal,
                        "plan_name" : goal + " " + level,
                        "plan_desc" : plan_desc,
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
    
print ("DONE !\n    Elapsed Total Time : ", time.time() - start_time)

