from langchain.llms import Ollama
import json, re, os

exercises = ["Squats", "Push-ups", "Lunges", "Plank", "Burpees", "Mountain Climbers", "Jumping Jacks", "High Knees", "Glute Bridge", "Crunches", "Bicycle Crunches", "Russian Twists", "Leg Raises", "Wall Sits", "Tricep Dips", "Inchworm Walk", "Superman", "Bird Dog", "Dead Bug", "Calf Raises", "Single-Leg Deadlift", "Curtsy Lunges", "Fire Hydrants", "Donkey Kicks", "Lateral Lunges", "Step-ups", "Box Jumps", "Tuck Jumps", "Jumping Lunges", "Plank Jacks", "Plank Tap", "Plank Reach", "Side Plank", "Reverse Plank", "Downward Dog Push-ups", "Diamond Push-ups", "Decline Push-ups", "Archer Push-ups", "Shoulder Taps", "Leg Flutters", "Scissor Kicks", "Hollow Hold", "Reverse Crunches", "Sit-ups", "V-ups", "Flutter Kicks", "Heel Touches", "Oblique Crunches", "Plank with Knee Tucks", "Squat Jumps", "Arm circles", "Butt kicks", "Arm swings", "Neck rolls", "Shoulder rolls", "Ankle circles", "Marching in place", "Arm raises", "Quad stretches", "Hamstring stretches", "Chest stretches", "Tricep stretches", "Shoulder stretches", "Lower back rotations", "Neck stretches", "Lower back stretch", "Downward-Facing Dog", "Warrior II Pose", "Triangle Pose", "Mountain Pose", "Cat-Cow Pose", "Child's Pose", "Plank Pose", "Bridge Pose", "Cobra Pose", "Seated Spinal Twist"]

llm = Ollama(model="neural-chat", temperature=0.5) 

unit_data = []
with open("./PT/Data/pt_unit.json", "r", encoding='utf-8') as f:
    unit_data = json.load(f)

def generate_pt_plan (gender, age, goal, level, abnormal):

    prompt = """You are a personal trainer. Answer the training guide based on your client's information. :\n
    Client Information >
    Gender: """ + gender + """\nAge : """ + age + """\nGoal : """ + goal + """\nExercise Level : """ + level + """\nHealth abnormalities: """ + abnormal + """\n\nOUTPUT example >
    1. PT Plan Name : Weight Loss (beginner)
    2. PT Plan Description : 
    3. Additional recommendations (mindset, diet, sleep) : """

    result = llm.invoke( prompt )

    return result

def generate_daily_program (goal, level):
    prompt = """Create a """ + level + """'s home training program for """ + goal + """. do not explan. just keyword. you must choose a method from the pool :\n\n pool : """ + str(exercises) + """\n\n output example: ["Push-ups", "Lunges", "Plank", "Burpees"]"""
    
    plan = llm.invoke( prompt )
    print (plan)
    
    matches = re.findall( r"\[(.*?)\]" , str(plan))
    today_plan = eval(matches[0])

    daily_program = []
    
    for plan in today_plan:    
        for unit in unit_data:
            if unit.get("unit_name") == plan + " " + level:
                daily_program.append ( unit )

    return daily_program
    
def generate_answer (unit_name, question):
    
    training_guide = ""

    for unit in unit_data:
        if unit.get("unit_name") == unit_name:
            training_guide = unit.get("unit_guide")
   
    prompt = """You are a personal trainer. Answer the your client's question based on training guide :\n\n your client's question : """ + question + """\n\ntraining guide : \n""" + training_guide

    response = llm.invoke (prompt)
    
    return response
