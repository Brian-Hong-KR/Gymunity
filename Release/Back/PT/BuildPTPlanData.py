from langchain.llms import Ollama
from youtubesearchpython import VideosSearch

import json, time

import dotenv, os
f = dotenv.find_dotenv()
dotenv.load_dotenv(f)
file_path = os.environ["pt_plan_file_path"]

gender_list = ["male", "female"]
age_list = ["young", "old"]
goal_list = ["Body fat reduction", "Muscle gain", "Overall health improvement"]
level_list = ["beginner", "Intermediate", "advanced"]
abnormal_list = ["cardiovascular disease", "musculoskeletal disorders", "respiratory diseases", "no health problems"]

llm = Ollama(model="neural-chat", temperature=0.5) 

start_time = time.time()

with open(file_path, "w", encoding='utf-8') as f:
    f.write("[\n")

for gender in gender_list:
    for age in age_list:
        for goal in goal_list:
            for level in level_list:
                for abnormal in abnormal_list:
                    prompt = """You are a personal trainer. Answer the training guide based on your client's information. :\n
                    Client Information >
                    Gender: """ + gender + """\nAge : """ + age + """\nGoal : """ + goal + """\nExercise Level : """ + level + """\nHealth abnormalities: """ + abnormal + """\n\nOUTPUT example >
                    1. PT Plan Name : Weight Loss (beginner)
                    2. PT Plan Description : 
                    3. Additional recommendations (mindset, diet, sleep) : """

                    plan_desc = llm.invoke( prompt )

                    new_data = {
                        "gender": gender,
                        "age" : age,
                        "goal" : goal,
                        "level" : level,
                        "abnormal" : abnormal,
                        "plan_name" : goal + " " + level,
                        "plan_desc" : plan_desc
                    }
                    
                    print ( """\nGender: """ + gender + """\nAge : """ + age + """\nGoal : """ + goal + """\nExercise Level : """ + level + """\nHealth abnormalities: """ + abnormal )

                    with open( file_path, "a", encoding='utf-8') as f:
                        json.dump (new_data, f, indent = 4)
                        f.write(",\n")

# TODO : 마지막 콤마 제거
with open(file_path, "a", encoding='utf-8') as f:
    f.write("]")
    
print ("DONE !\n    Elapsed Time : ", time.time() - start_time)
print ("    Total Unit : ", len (gender) * len (age) * len (goal) * len (level) * len (abnormal) )

