from langchain_anthropic import ChatAnthropic
from langchain_community.chat_models import ChatOllama
from langchain_community.tools import YouTubeSearchTool
import json
import datetime
import re
# import torch, gc
# gc.collect()
# torch.cuda.empty_cache()

file_path = "pt_unit.json"

llm = ChatAnthropic(
    model_name="claude-3-opus-20240229",
    temperature=0, 
    anthropic_api_key="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", 
)

local_llm = ChatOllama(
    model="llama2",
    temperature=0,     
) 


#50 exercise methods suitable for home training. do not summarize, i need just method name. (output examples: "squats", "push-ups")

exercises = [ "Squats", "Push-ups", "Lunges", "Plank", "Burpees", "Mountain Climbers", "Jumping Jacks", "High Knees", "Glute Bridge", "Crunches", "Bicycle Crunches", "Russian Twists", "Leg Raises", "Wall Sits", "Tricep Dips", "Inchworm Walk", "Superman", "Bird Dog", "Dead Bug", "Calf Raises", "Single-Leg Deadlift", "Curtsy Lunges", "Fire Hydrants", "Donkey Kicks", "Lateral Lunges", "Step-ups"]

# exercises = [ "Box Jumps", "Tuck Jumps", "Jumping Lunges", "Plank Jacks", "Plank Tap", "Plank Reach", "Side Plank", "Reverse Plank", "Downward Dog Push-ups", "Diamond Push-ups", "Decline Push-ups", "Archer Push-ups", "Shoulder Taps", "Leg Flutters", "Scissor Kicks", "Hollow Hold", "Reverse Crunches", "Sit-ups", "V-ups", "Flutter Kicks", "Heel Touches", "Oblique Crunches", "Plank with Knee Tucks", "Squat Jumps"]

levels = ["beginner", "Intermediate", "advanced"]

def BuildPTunit():
    start_time = datetime.datetime.now()

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
            tool = YouTubeSearchTool()
            unit_video = tool.run( """홈트레이닝 """ + levels[j] + " " + exercises[i] + ", 1" )
            print ( unit_video )
            
            print ( "STEP 4. save unit info" )  
            new_data = {
                "unit_name": unit_name,
                "unit_guide" : str(unit_guide),
                "unit_video" : str(unit_video)
            }
            with open(file_path, "a", encoding='utf-8') as f:
                json.dump (new_data, f, indent = 4)
                f.write(",\n")
                
    with open(file_path, "a", encoding='utf-8') as f:
        f.write("]")
        
    print ("DONE !\n    Elapsed Time : ", datetime.datetime.now() - start_time)
    print ("    Total Unit : ", len (exercises) * len (levels) )

    
def DailyPlan (user_level, user_goal):
   
    # plan_prompt = """Create a one-hour exercise program. You must choose a method from the pool.\n\nprogram level and goals: """ + user_level + """, """ + user_goal + """\n\n
    # pool : """ + str(exercises) + """\n\nExample output: ["Squats", "Push-ups", "Lunges", "Plank", "Burpees"]"""

    # plan_prompt = """Create a beginner's exercise program. do not explain. just keyword.\n\n output example : ["Squats", "Push-ups", "Lunges", "Plank", "Burpees"]"""
    # plan = local_llm.invoke( plan_prompt )
    
    plan = """content='\nHere is a beginner\'s exercise program:\n\n["Squats", "Push-ups", "Lunges", "Plank", "Burpees"]'"""
    sep
    daily_plans = []
    daily_plans = re.findall(r"\[(.*?)\]", str(plan))
    
    print ( daily_plans )

            
    with open(file_path, "r", encoding='utf-8') as f:
        unit_data = json.load(f)

    daily_program = []

    for plan in daily_plans:    
        for unit in unit_data:
            if unit.get("unit_name") == plan + " (" + user_level + ")":
                daily_program.append ( unit )

    print ( daily_program )
    
    return daily_program
    
if __name__ == '__main__':
    
    # with open("pt_unit.json", "w", encoding='utf-8') as f:
    #     f.write("[\n")

    # BuildPTunit()

    program_plan = DailyPlan ( "beginner", "fat loss")
    

