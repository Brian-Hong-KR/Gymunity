from langchain.llms import Ollama
import json, time
import dotenv, os, re

f = dotenv.find_dotenv()
dotenv.load_dotenv(f)
file_path = os.environ["daily_plan_file_path"]
exercises = os.environ["exercises"]

exercise_list = eval(exercises)
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
total = len(gender_list) * len(age_list) * len(goal_list) * len(level_list) * len(abnormal_list)

for gender in gender_list:
    for age in age_list:
        for goal in goal_list:
            for level in level_list:
                for abnormal in abnormal_list:

                    step_start_time = time.time()

                    prompt = f"""Write a home training program for today based on the customer's information (but without any preparation) The result is only output in python list format as shown in the example :\n\nCustomer information >\n\nGender : {gender}\nAge : {age}\nWorkout Goal : {goal}\nExercise level : {level}\nHealth Concerns: {abnormal}\n\nSample Results >\n\n[ "Running in place", "Dynamic stretches (neck, shoulders, arms, lower back, legs)", "Burpees (3 sets x max reps)", "Lunges (3 sets x 10 reps each leg)", "Push-ups (3 sets x max reps)", "Planks (3 sets x 30 seconds)", "Mountain climbers (3 sets x 30 seconds)", "Static stretches (neck, shoulders, arms, lower back, legs)"]"""

                    plan = llm.invoke(prompt)

                    matches = []
                    matches = re.findall(r"\[(.*?)\]", str(plan))

                    print(matches)

                    if len(matches) == 0:
                        daily_program = "default"
                    else:
                        daily_program = eval(matches[0])

                    new_data = {
                        "gender": gender,
                        "age": age,
                        "goal": goal,
                        "level": level,
                        "abnormal": abnormal,
                        "daily_program": daily_program,
                    }

                    progress += 1
                    with open(file_path, "a", encoding='utf-8') as f:
                        json.dump(new_data, f, indent=4)
                        if progress < total:
                            f.write(",\n")

                    print("Step : " + str(progress) + " / " + str(total))
                    print(" time : ", time.time() - step_start_time)

with open(file_path, "a", encoding='utf-8') as f:
    f.write("]")

print("DONE !\n    Elapsed Total Time : ", time.time() - start_time)

