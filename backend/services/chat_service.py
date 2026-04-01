import json
from AI.chains.topic_chain import classify_topic
from schemas.learn_schemas import Topic
from core.config import MESSAGE_LIMITS
from AI.chains.chat_chain import get_chat_response, get_session_summary

def get_chat_limit(mode):
    if mode == "interview":
        return MESSAGE_LIMITS["interview"]
    elif mode == "learn":
        return MESSAGE_LIMITS["learn"]
    else:
        raise ValueError("Invalid mode")

def normalize_topic_service(request):
    #chat input
    # use AI to return topic in format 
    # export interface Topic {
    #   id: string;
    #   title: string;
    #   description: string;
    # }
    
    classified_topic = classify_topic(request)
    # return an envelope that matches frontend expectation:
    # { topic: { id,title,description } }
    return {"topic": classified_topic}

def handle_chat_service(request):
    """Handle chat request: respond to user message"""
    reply = get_chat_response(request)
    response = {"reply": reply}
    return response


def handle_summary_service(request):
    """Get session summary when chat limit reached"""
    summary = get_session_summary(request)
    if request.mode == "interview":
        # INTERVIEW_EVALUATION_PROMPT produces strict JSON for scoring + summary
        try:
            parsed = json.loads(summary)
            understanding = int(parsed.get("understanding", 0))
            communication = int(parsed.get("communication", 0))
            coverage = int(parsed.get("coverage", 0))
            summary_text = parsed.get("summary", "No details provided.")
            feedback = {
                "understanding": understanding,
                "communication": communication,
                "coverage": coverage,
                "summary": summary_text,
            }
            return {"score": feedback, "feedback": summary_text}
        except Exception:
            # If parsing fails, fall back to generic feedback
            return {
                "score": {
                    "understanding": 0,
                    "communication": 0,
                    "coverage": 0,
                    "summary": summary,
                },
                "feedback": summary,
            }
    return {"summary": summary}


def log_session_service(session_data):
    # keep logs to disk or DB as needed; here we just print and return ack
    print("[chat log]", session_data)
    return {"status": "logged", "entries": len(session_data.get("messages", []))}



    