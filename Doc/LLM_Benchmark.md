llm_list = ["gemma:2b", "solar", "neural-chat", "phi", "llama2"]

BENCHMARK RESULT

1. 
input = """Create a beginner's home training program with a combination of exercises from the given pool. the output must be as shown in the example. :

    exercises_pool = [ "Squats", "Push-ups", "Lunges", "Plank", "Burpees", "Mountain Climbers", "Jumping Jacks", "High Knees", "Glute Bridge", "Crunches", "Bicycle Crunches", "Russian Twists", "Leg Raises", "Wall Sits", "Tricep Dips", "Inchworm Walk", "Superman", "Bird Dog", "Dead Bug", "Calf Raises", "Single-Leg Deadlift", "Curtsy Lunges", "Fire Hydrants", "Donkey Kicks", "Lateral Lunges", "Step-ups", "Box Jumps", "Tuck Jumps", "Jumping Lunges", "Plank Jacks", "Plank Tap", "Plank Reach", "Side Plank", "Reverse Plank", "Downward Dog Push-ups", "Diamond Push-ups", "Decline Push-ups", "Archer Push-ups", "Shoulder Taps", "Leg Flutters", "Scissor Kicks", "Hollow Hold", "Reverse Crunches", "Sit-ups", "V-ups", "Flutter Kicks", "Heel Touches", "Oblique Crunches", "Plank with Knee Tucks", "Squat Jumps", "Arm circles", "Butt kicks", "Arm swings", "Neck rolls", "Shoulder rolls", "Ankle circles", "Marching in place", "Arm raises", "Quad stretches", "Hamstring stretches", "Chest stretches", "Tricep stretches", "Shoulder stretches", "Lower back rotations", "Neck stretches", "Lower back stretch", "Downward-Facing Dog", "Warrior II Pose", "Triangle Pose", "Mountain Pose", "Cat-Cow Pose", "Child's Pose", "Plank Pose", "Bridge Pose", "Cobra Pose", "Seated Spinal Twist"]

    output_example = ["Push-ups", "Lunges", "Plank", "Burpees"]"""

gemma:2b 
- 24.65, normal
solar 
- 24.71, good
neural-chat
- 51.69, normal
phi
- 14.87, bad
llama2
- 47.90, normal

2. 
    prompt = """Select 8 items from the EXERCISE_POOL, and Answer in the form of OUTPUT_EXAMPLE : 
    
    EXERCISE_POOL = [ "Squats", "Push-ups", "Lunges", "Plank", "Burpees", "Mountain Climbers", "Jumping Jacks", "High Knees", "Glute Bridge", "Crunches", "Bicycle Crunches", "Russian Twists", "Leg Raises", "Wall Sits", "Tricep Dips", "Inchworm Walk", "Superman", "Bird Dog", "Dead Bug", "Calf Raises", "Single-Leg Deadlift", "Curtsy Lunges", "Fire Hydrants", "Donkey Kicks", "Lateral Lunges", "Step-ups", "Box Jumps", "Tuck Jumps", "Jumping Lunges", "Plank Jacks", "Plank Tap", "Plank Reach", "Side Plank", "Reverse Plank", "Downward Dog Push-ups", "Diamond Push-ups", "Decline Push-ups", "Archer Push-ups", "Shoulder Taps", "Leg Flutters", "Scissor Kicks", "Hollow Hold", "Reverse Crunches", "Sit-ups", "V-ups", "Flutter Kicks", "Heel Touches", "Oblique Crunches", "Plank with Knee Tucks", "Squat Jumps", "Arm circles", "Butt kicks", "Arm swings", "Neck rolls", "Shoulder rolls", "Ankle circles", "Marching in place", "Arm raises", "Quad stretches", "Hamstring stretches", "Chest stretches", "Tricep stretches", "Shoulder stretches", "Lower back rotations", "Neck stretches", "Lower back stretch", "Downward-Facing Dog", "Warrior II Pose", "Triangle Pose", "Mountain Pose", "Cat-Cow Pose", "Child's Pose", "Plank Pose", "Bridge Pose", "Cobra Pose", "Seated Spinal Twist"]

    OUPUT_EXAMPLE = ["Push-ups", "Lunges", "Plank", "Burpees"]""

 gemma:2b 
- 13.98, normal
solar 
- 129.53, good 
neural-chat
- 27.73, good
phi
- 28.5, bad
llama2
- 30.34, bad

3.
 prompt = """Select 8 items from the EXERCISE_POOL. Don't explan. just list the 8 items : 
    
    EXERCISE_POOL = [ "Squats", "Push-ups", "Lunges", "Plank", "Burpees", "Mountain Climbers", "Jumping Jacks", "High Knees", "Glute Bridge", "Crunches", "Bicycle Crunches", "Russian Twists", "Leg Raises", "Wall Sits", "Tricep Dips", "Inchworm Walk", "Superman", "Bird Dog", "Dead Bug", "Calf Raises", "Single-Leg Deadlift", "Curtsy Lunges", "Fire Hydrants", "Donkey Kicks", "Lateral Lunges", "Step-ups", "Box Jumps", "Tuck Jumps", "Jumping Lunges", "Plank Jacks", "Plank Tap", "Plank Reach", "Side Plank", "Reverse Plank", "Downward Dog Push-ups", "Diamond Push-ups", "Decline Push-ups", "Archer Push-ups", "Shoulder Taps", "Leg Flutters", "Scissor Kicks", "Hollow Hold", "Reverse Crunches", "Sit-ups", "V-ups", "Flutter Kicks", "Heel Touches", "Oblique Crunches", "Plank with Knee Tucks", "Squat Jumps", "Arm circles", "Butt kicks", "Arm swings", "Neck rolls", "Shoulder rolls", "Ankle circles", "Marching in place", "Arm raises", "Quad stretches", "Hamstring stretches", "Chest stretches", "Tricep stretches", "Shoulder stretches", "Lower back rotations", "Neck stretches", "Lower back stretch", "Downward-Facing Dog", "Warrior II Pose", "Triangle Pose", "Mountain Pose", "Cat-Cow Pose", "Child's Pose", "Plank Pose", "Bridge Pose", "Cobra Pose", "Seated Spinal Twist"]

    ouput example : Push-ups, Lunges, Plank, Burpees"""

 gemma:2b 
- 16.70 normal
solar 
- 61.26, good
neural-chat
- 27.78,  Squats, Jumping Jacks, Glute Bridge, Russian Twists, Leg Raises, Wall Sits, Tricep Dips, Calf Raises
phi
- 37.07 , bad
llama2
- 27.90, normal

4. random 8 items

gemma : 15.8 (not good)
neural-chat : 9.1 (very good)

5.

choose 8 fat-burning items from the EXERCISE_POOL to . Don't explan, just list the 8 items : 

 [Squats, Push-ups, Lunges, Mountain Climbers, Jumping Jacks, High Knees, Crunches, Russian Twists]
4.652194976806641

6.
choose 8 items from the EXERCISE_POOL to strengthen butt muscles. Do not explan, just list the 8 items : 
Squats, Plank, Burpees, Glute Bridge
4.31516170501709


7. temperature tune

i =  0.1
 Squats, Mountain Climbers, Glute Bridge, Calf Raises
2.8419272899627686
i =  0.2
 Squats, Mountain Climbers, Glute Bridge, Calf Raises
2.6026058197021484
i =  0.30000000000000004
 Squats, Mountain Climbers, High Knees, Glute Bridge, Crunches, Bicycle Crunches, Russian Twists, Leg Raises
3.177969455718994
i =  0.4
 Squats, Glute Bridge, Leg Raises, Wall Sits
2.538132429122925
i =  0.5
 Squats, Mountain Climbers, High Knees, Glute Bridge, Calf Raises, Single-Leg Deadlift, Fire Hydrants, Donkey Kicks
3.2734241485595703
i =  0.6
 Squats, Mountain Climbers, Jumping Jacks, High Knees, Glute Bridge, Crunches, Bicycle Crunches, Russian Twists
3.2431252002716064
i =  0.7
 Squats, Leg Raises, Side Plank, Calf Raises
2.5677621364593506
i =  0.7999999999999999
 Squats, Glute Bridge, Crunches, Single-Leg Deadlift
2.636960029602051
i =  0.8999999999999999
 Squats, Mountain Climbers, Donkey Kicks, Step-ups
2.618295907974243
i =  0.9999999999999999
 Squats, Mountain Climbers, Glute Bridge, Burpees, Jumping Jacks, High Knees, Leg Raises, Wall Sits
3.140967845916748
i =  1.0999999999999999
 Squats, Glute Bridge, Leg Raises, Wall Sits
2.5438010692596436
    
i =  0
 Squats, Mountain Climbers, Glute Bridge, Calf Raises
2.769758939743042
i =  0.1
 Squats, Mountain Climbers, High Knees, Glute Bridge, Crunches, Bicycle Crunches, Russian Twists, Leg Raises
3.1886799335479736
i =  0.2
 Squats, Mountain Climbers, Glute Bridge, Calf Raises
2.6118783950805664
i =  0.30000000000000004
 Squats, Mountain Climbers, Glute Bridge, Calf Raises
2.6046488285064697
i =  0.4
 Squats, Mountain Climbers, Glute Bridge, Calf Raises
2.6064159870147705
i =  0.5
 Squats, Mountain Climbers, High Knees, Glute Bridge, Crunches, Bicycle Crunches, Russian Twists, Leg Raises
3.202397584915161
i =  0.6
 Squats, Mountain Climbers, Glute Bridge, High Knees
2.590667486190796
i =  0.7
 Squats, Lunges, Glute Bridge, High Knees
2.5866215229034424
i =  0.7999999999999999
 [Squats, High Knees, Glute Bridge, Calf Raises]
2.6615917682647705
i =  0.8999999999999999
 Squats, Plank, Burpees, High Knees, Glute Bridge, Crunches, Leg Raises, Wall Sits
3.0517642498016357
i =  0.9999999999999999
 Squats, Push-Ups, Glute Bridge, High Knees, Jumping Jacks, Side Plank, Calf Raises, Single-Leg Deadlift
3.300381660461426

i =  0
 Squats, Mountain Climbers, Glute Bridge, Calf Raises
2.863623857498169
i =  0.1
 Squats, Mountain Climbers, Glute Bridge, Calf Raises
2.592388868331909
i =  0.2
 Squats, Mountain Climbers, High Knees, Glute Bridge, Crunches, Bicycle Crunches, Russian Twists, and Leg Raises
3.221843719482422
i =  0.30000000000000004
 Squats, Glute Bridge, Leg Raises, Wall Sits
2.539121150970459
i =  0.4
 Squats, Glute Bridge, Crunches, Russian Twists
2.5611298084259033
i =  0.5
 Squats, Push-ups, Lunges, Glute Bridge, Calf Raises, Single-Leg Deadlift, Curtsy Lunges, Fire Hydrants
3.303114175796509
i =  0.6
 Squats, Mountain Climbers, Jumping Jacks, High Knees, Glute Bridge, Crunches, Bicycle Crunches, Russian Twists
3.237626552581787
i =  0.7
 Squats, Mountain Climbers, Glute Bridge, Calf Raises
2.5914390087127686
i =  0.7999999999999999
 Squats, Mountain Climbers, Glute Bridge, High Knees, Calf Raises, Single-Leg Deadlift, Curtsy Lunges, Donkey Kicks
3.323528528213501
i =  0.8999999999999999
 Squats, Mountain Climbers, Jumping Jacks, High Knees, Glute Bridge, Crunches, Bicycle Crunches, Russian Twists
3.240506887435913
i =  0.9999999999999999
 Squats, Push-Ups, Lunges, Glute Bridge, High Knees, Crunches, Dead Bug, Single-Leg Deadlift
3.18645977973938
