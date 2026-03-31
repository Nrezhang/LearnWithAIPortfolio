from AI.chains.topic_chain import classify_topic

def test_classify_topic():
    topic = classify_topic("how does twitter work both in asia and in the US? distributed systems")
    print(topic)
    
test_classify_topic()