from youtubesearchpython import VideosSearch
import json, time


daily_plan_file_path = "daily_plan.json"
result_file_path = "daily_plan_included.json"

start_time = time.time()

daily_guide_list = []

with open( daily_plan_file_path , "r", encoding='utf-8') as f:
    daily_guide_list = json.load(f)

for item in daily_guide_list:
    item["videoList"] = {}
    for unit_name in item["daily_program"]:

        videosSearch = VideosSearch("""홈트레이닝 """ + unit_name + ' ' + item["level"], limit=1)

        for video in videosSearch.result()['result']:
            item["videoList"][unit_name] = video['id']

        print ( item )

with open(result_file_path, "a", encoding='utf-8') as f:
    json.dump(daily_guide_list, f, indent=4)

print("DONE !\n    Elapsed Total Time : ", time.time() - start_time)

