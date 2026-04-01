from AI.llm_client import get_ai_response
from schemas.learn_schemas import Topic
from AI.prompts.topic_prompt import TOPIC_PROMPT
import json


def classify_topic(request):
    messages = [
        {"role": "system", "content": TOPIC_PROMPT},
        {"role": "user", "content": request}
    ]
    response = get_ai_response(messages, temperature=0.1, max_tokens=128)
    try:
        topic_dict = json.loads(response["content"])
        return Topic(**topic_dict)
    except Exception as e:
        print(f"Error parsing topic response: {e}")
        return Topic(id="unknown", title=request, description="")

