from langchain.llms import Ollama
from langchain_community.tools import YouTubeSearchTool

import json, time

exercises = ["Squats", "Push-ups", "Lunges", "Plank", "Burpees", "Mountain Climbers", "Jumping Jacks", "High Knees", "Glute Bridge", "Crunches", "Bicycle Crunches", "Russian Twists", "Leg Raises", "Wall Sits", "Tricep Dips", "Inchworm Walk", "Superman", "Bird Dog", "Dead Bug", "Calf Raises", "Single-Leg Deadlift", "Curtsy Lunges", "Fire Hydrants", "Donkey Kicks", "Lateral Lunges", "Step-ups", "Box Jumps", "Tuck Jumps", "Jumping Lunges", "Plank Jacks", "Plank Tap", "Plank Reach", "Side Plank", "Reverse Plank", "Downward Dog Push-ups", "Diamond Push-ups", "Decline Push-ups", "Archer Push-ups", "Shoulder Taps", "Leg Flutters", "Scissor Kicks", "Hollow Hold", "Reverse Crunches", "Sit-ups", "V-ups", "Flutter Kicks", "Heel Touches", "Oblique Crunches", "Plank with Knee Tucks", "Squat Jumps", "Arm circles", "Butt kicks", "Arm swings", "Neck rolls", "Shoulder rolls", "Ankle circles", "Marching in place", "Arm raises", "Quad stretches", "Hamstring stretches", "Chest stretches", "Tricep stretches", "Shoulder stretches", "Lower back rotations", "Neck stretches", "Lower back stretch", "Downward-Facing Dog", "Warrior II Pose", "Triangle Pose", "Mountain Pose", "Cat-Cow Pose", "Child's Pose", "Plank Pose", "Bridge Pose", "Cobra Pose", "Seated Spinal Twist"]
levels = ["beginner", "Intermediate", "advanced"]

llm = Ollama(model="neural-chat", temperature=0.5) 

start_time = time.time()

with open("pt_guide.json", "w", encoding='utf-8') as f:
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
        tool = YouTubeSearchTool()
        unit_video = tool.run( """홈트레이닝 """ + levels[j] + " " + exercises[i] + ", 1" )
        print ( unit_video )
        
        print ( "STEP 4. save unit info" )  
        new_data = {
            "unit_name": unit_name,
            "unit_guide" : str(unit_guide),
            "unit_video" : str(unit_video)
        }
        with open( "pt_guide.json", "a", encoding='utf-8') as f:
            json.dump (new_data, f, indent = 4)
            f.write(",\n")
            
with open("pt_guide.json", "a", encoding='utf-8') as f:
    f.write("]")
    
print ("DONE !\n    Elapsed Time : ", time.time() - start_time)
print ("    Total Unit : ", len (exercises) * len (levels) )

