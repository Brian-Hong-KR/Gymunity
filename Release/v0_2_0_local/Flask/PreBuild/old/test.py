import ollama

def Question (unit_name, question):
    response = ollama.chat (model='llama3', messages = [{"role":"system","content": f"""Answer about {unit_name} like a professional trainer. """},{"role":"user","content":question}] )
    print ( response['message']['content'])

if __name__ == "__main__":
    Question ("push-ups","팔꿈치가 아픕니다.")