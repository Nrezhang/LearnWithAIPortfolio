from pydantic import BaseModel



class Topic(BaseModel):
    id: str
    title: str
    description: str


class TopicRequest(BaseModel):
    input: str  
