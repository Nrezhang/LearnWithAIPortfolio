from pydantic import BaseModel



class Topic(BaseModel):
    id: str
    title: str
    description: str


class TopicRequest(BaseModel):
    input: str  
    
class Message(BaseModel):
    role: str
    content: str
    
class ChatRequest(BaseModel):
    subject: str
    topic_id: str
    topic_label: str
    mode: str
    message: str
    history: list[Message]
    ai_message_count: int
    
