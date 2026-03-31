from AI.llm_client import get_ai_response

messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Explain hashmaps"},
]

response = get_ai_response(messages)

print(response)