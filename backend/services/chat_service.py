from AI.chains.topic_chain import classify_topic
from schemas.topic import Topic

def normalize_topic(request):
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
    