from langchain.llms import Ollama
from youtubesearchpython import VideosSearch

import json, time

import dotenv, os
f = dotenv.find_dotenv()
dotenv.load_dotenv(f)
file_path = os.environ["pt_unit_file_path"]
exercise_list = os.environ["exercises"]

exercises = eval (exercise_list)
print ( type(exercises) )

levels = ["beginner", "Intermediate", "advanced"]

llm = Ollama(model="neural-chat", temperature=0.5) 

start_time = time.time()

with open(file_path, "w", encoding='utf-8') as f:
    f.write("[\n")

for i in range (len (exercises)):
    for j in range (len (levels)):
        
        print ( "STEP 1. unit name" )
        unit_name = exercises[i] + " " + levels[j]
        print ( unit_name )
        
        print ( "STEP 2. generate unit guide" )
        unit_guide_prompt = "You are a home personal trainer. your client's exercise level is " + levels[j] + "in home training . Write a script for a " + exercises[i] + """ video in the following order : \n\n 1. purpose and expected results.\n 2. exercise method and form.\n 3. recommended number of sets and repetitions.\n 4. what to focus on and what to watch out for."""   
        unit_guide = llm.invoke( unit_guide_prompt )

        print ( unit_guide )        
        
        print ( "STEP 3. search unit video" )
        videosSearch = VideosSearch("""홈트레이닝 """ + levels[j] + " " + exercises[i], limit = 1)

        for video in videosSearch.result()['result']:
            unit_video = video['id']
        
        print ( "STEP 4. save unit info" )  
        new_data = {
            "unit_name": unit_name,
            "unit_guide" : str(unit_guide),
            "unit_video" : unit_video
        }
        with open( file_path, "a", encoding='utf-8') as f:
            json.dump (new_data, f, indent = 4)
            f.write(",\n")

# TODO : 마지막 콤마 제거
with open(file_path, "a", encoding='utf-8') as f:
    f.write("]")
    
print ("DONE !\n    Elapsed Time : ", time.time() - start_time)
print ("    Total Unit : ", len (exercises) * len (levels) )

