from fastapi import FastAPI
from fastapi import APIRouter
from services.chat_service import normalize_topic as normalize_topic_service
from schemas.topic import TopicRequest

router = APIRouter(prefix="/api/chat")


@router.post("/normalize-topic")
async def normalize_topic_endpoint(request: TopicRequest):
    topic = normalize_topic_service(request.input)
    return topic