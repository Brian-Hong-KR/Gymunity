# 가장 똑똑한 AI 에게 가이드 생성 요청하기 > claude-3-opus-20240229
#ref > https://python.langchain.com/docs/integrations/chat/anthropic
# key = "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"


# Step 1. 홈트레이닝 의 종류
exercises = ["squat", "push-up", "sit-up", "lunge", "plank", "Burpee", "Pull-up", "Dips", "Jumping-Jack", "Mountain-Climber"]
guide_points = ["benefit", "beginner-program", "advanced-program", "form", "safety", "focus", "guide-video"]

question_prompt = "You're a personal trainer. When a client asks you about the {guide_point} of {exercise}, you're able to summarize your expertise."

for i ++, j ++
    answer = question ( exercise_list[i] x guide_template [j] )
    file write 'guide.json'
    
print ("done")