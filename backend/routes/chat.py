from fastapi import FastAPI
from fastapi import APIRouter
from schemas.learn_schemas import TopicRequest, ChatRequest
from services.chat_service import normalize_topic_service, handle_chat_service, handle_summary_service, log_session_service

router = APIRouter(prefix="/api/chat")


@router.post("/normalize-topic")
async def normalize_topic_endpoint(request: TopicRequest):
    topic = normalize_topic_service(request.input)
    return topic

@router.post("/chat")
async def interview_endpoint(request: ChatRequest):
    response = handle_chat_service(request=request)
    return response
@router.post("/summary")
async def summary_endpoint(request: ChatRequest):
    response = handle_summary_service(request=request)
    return response




@router.post("/log-session")
async def log_session_endpoint(session_data: dict):
    response = log_session_service(session_data)
    return response