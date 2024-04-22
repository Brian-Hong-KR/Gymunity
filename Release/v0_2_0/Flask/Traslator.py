import requests, uuid, json

def TranToKorean (message):
    
    # Gymunity 외 용도로 사용금지
    request = requests.post(
        "https://api.cognitive.microsofttranslator.com/translate", 
        params={'api-version': '3.0','from': 'en','to': 'ko',}, 
        headers={
            'Ocp-Apim-Subscription-Key': "b3a91799f02249d2bda84079cab15202",
            'Ocp-Apim-Subscription-Region': "koreacentral",
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4()),
        }, 
        json=[{ 'text': message }])
    
    response = request.json()

    return response[0].get("translations")[0].get("text")

if __name__ == "__main__":
    print (TranToKorean ("hello"))