import requests

TOKEN = "8068956461:AAHqb9_94N1d8CuDhk_erwwZDtOWVOa52Jk"
CHAT_ID = "1018066495"
MESSAGE = "Hey Teun, hoe gaat het met je?"

url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
params = {"chat_id": CHAT_ID, "text": MESSAGE}

response = requests.post(url, params=params)
print(response.json())  # Geeft de respons terug