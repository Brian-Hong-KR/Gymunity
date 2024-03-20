from langchain_community.chat_models import ChatOllama

llm = ChatOllama(model="llama2", temperature=0,) 

gender = "Male"
age= "39"
goal = "to lose weight"
level = "beginner"
abnormal = "none"

#    사용자 정보 : 성별, 나이, 운동 목표, 운동 수준, 건강 이상
#       운동 목표 : 체중 감량, 근육량 증가, 종합 (체중, 체력, 스트레스 해소 등), 기타
#       운동 수준 : 초급, 중급, 고급
#    건강 이상 : 없음, 당뇨, 심장, 고혈압, 뼈/관절, 빈혈, 기타 => 추가 가이드 (추천 상품)

prompt = """You are a personal trainer. Answer the training guide based on your client's information. :\n
   Client Information >
   Gender: """ + gender + """\nAge : """ + age + """\nGoal : """ + goal + """\nExercise Level : """ + level + """\nHealth abnormalities: """ + abnormal + """\n\nOUTPUT example >
   1. PT Plan Name : Weight Loss (beginner)
   2. PT Plan Description : 
   3. Additional recommendations (mindset, diet, sleep) : """

result = llm.invoke( prompt )

print ( result )

# content="\nGreat, thank you for providing the client information! Based on what you've shared, here is a personal training plan tailored to your 
# client's needs:\n\n1. PT Plan Name: Weight Loss (Beginner)\n2. PT Plan Description: This plan is designed to help you lose weight through a combination of cardiovascular exercise and strength training. As a beginner, we will start with moderate-intensity workouts that gradually increase in difficulty as your fitness level improves. Our goal is to help you burn calories and build muscle mass, which will ultimately lead to weight loss.\n3. Additional Recommendations (Mindset, Diet, Sleep):\n
# * Mindset: It's important to have a positive mindset when starting any new exercise program. Remind yourself that losing weight takes time and effort, but it is possible with consistency and patience. Try to avoid negative self-talk and focus on the progress you make along the way.\n* Diet: A healthy diet is crucial for weight loss. Focus on consuming lean protein sources, 
# whole grains, fruits, and vegetables. Avoid processed foods and sugary drinks, as they can hinder your weight loss efforts. Try to eat at least 5 servings of fruits and vegetables per day, and limit your intake of added sugars and saturated fats.\n* Sleep: Getting enough sleep is essential for weight loss. Aim for 7-8 hours of sleep per night, as a lack of sleep can disrupt hormones that regulate hunger and fullness. Try to establish a consistent sleep schedule and create a relaxing bedtime routine to help you wind down before bed.\n\nWorkout Plan:\n\n* Monday: Cardio session (30 minutes) - Brisk walking, jogging, cycling, or swimming at moderate intensity\n* Wednesday: Strength training session (30 minutes) - Focus on compound exercises such as squats, lunges, push-ups, and rows. Use light to moderate weights and aim for 12-15 repetitions per set.\n* Friday: Cardio session (30 minutes) - Increase the intensity of your workout by adding hills or sprints to your routine.\n* Sunday: Rest day\n\nRemember, consistency is key when it comes to weight loss. Stick to your workout plan and make healthy dietary choices, and you'll see results over time. Good luck!"

