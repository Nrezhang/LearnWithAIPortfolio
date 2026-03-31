import requests
from core.config import NVIDIA_API_KEY

#https://docs.api.nvidia.com/nim/reference/abacusai-dracarys-llama-3_1-70b-instruct-infer
url = "https://integrate.api.nvidia.com/v1/chat/completions"
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": f"Bearer {NVIDIA_API_KEY}"
}

def get_ai_response(messages, model="abacusai/dracarys-llama-3.1-70b-instruct", max_tokens=128, temperature=0.5, top_p=1):
    #messages is structured like [
    #     {
    #         "role": "user",
    #         "content": "Write code to select rows from the dataframe `df` having the maximum `temp` for each `city`."
    #     }
    # ]
    #returns a dict with "content" and "tokens" keys
    payload = {
    "model": model,
    "max_tokens": max_tokens,
    "stream": False,
    "temperature": temperature,
    "top_p": top_p,
    "stop": None,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "messages": messages
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code != 200:
        raise Exception(f"LLM request failed {response.status_code}: {response.text}")
    data =  response.json()
    return {
        "content": data["choices"][0]["message"]["content"],
        "tokens": data["usage"]["total_tokens"]
    }

