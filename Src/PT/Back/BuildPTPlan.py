from langchain_anthropic import ChatAnthropic
from langchain_community.chat_models import ChatOllama
from langchain_community.tools import YouTubeSearchTool

ANTHROPIC_API_KEY = "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"

# exercises = ["squat", "push-up", "sit-up", "lunge", "plank", "Burpee", "Pull-up", "Dips", "Jumping-Jack", "Mountain-Climber"]
# levels = ["beginner", "novice", "Intermediate", "advanced"]
exercises = ["squat"]
levels = ["beginner"]

for i in range (len (exercises)):
    for j in range (len (levels)):
        print ( "STEP 1. unit name" )
        unit_name = exercises[i] + " (" + levels[j] + ")"
        print ( unit_name )
        
        print ( "STEP 2. generate unit guide" )
        unit_guide_prompt = "You are a personal trainer. your client's exercise level is " + levels[j] + "in home training . Write a script for a " + exercises[i] + """ video in the following order : \n\n 1. purpose and expected results.\n 2. exercise method and form.\n 3. recommended number of sets and repetitions.\n 4. what to focus on and what to watch out for."""   
        llm = ChatAnthropic(temperature=0, anthropic_api_key=ANTHROPIC_API_KEY, model_name="claude-3-opus-20240229")
        unit_guide = llm.invoke( unit_guide_prompt )
        print ( unit_guide )
        
        print ( "STEP 3. search unit video" )
        summary_prompt = """Please suggest only 5 Korean keywords to search for YouTube videos similar to the following exercise guide : \n\n""" + str(unit_guide)
        local_llm = ChatOllama(model="gemma:7b")         
        keyword = local_llm.invoke( summary_prompt )
        print ( keyword )
        tool = YouTubeSearchTool()
        unit_video = tool.run(keyword)
        print ( unit_video )
        
        # STEP 4. DB Insert
        #TODO : Host DB 


print ("done")
