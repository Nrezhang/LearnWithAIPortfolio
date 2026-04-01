from AI.llm_client import get_ai_response
from schemas.learn_schemas import Message, ChatRequest
from AI.prompts.chat_prompts import LEARN_PROMPT, INTERVIEWPROMPT, LEARN_SUMMARY_PROMPT, INTERVIEW_EVALUATION_PROMPT
import json



def get_chat_response(request):
    """Get AI response to user's message"""
    messages = [
        {"role": "system", "content": LEARN_PROMPT.format(topic=request.topic_id) if request.mode == "learn" else INTERVIEWPROMPT.format(topic=request.topic_id)},
        {"role": "user", "content": request.message}
    ] + [{"role": msg.role, "content": msg.content} for msg in request.history]
        
    response = get_ai_response(messages, temperature=0.5, max_tokens=256)
    print(f"LLM response: {response['content']}")
    return response["content"]


def get_session_summary(request):
    """Get session summary when chat limit reached"""
    messages = [
        {"role": "system", "content": LEARN_SUMMARY_PROMPT if request.mode == "learn" else INTERVIEW_EVALUATION_PROMPT},
        {"role": "user", "content": request.message}
    ] + [{"role": msg.role, "content": msg.content} for msg in request.history]
    
    response = get_ai_response(messages, temperature=0.5, max_tokens=512)
    print(f"Summary response: {response['content']}")
    return response["content"]