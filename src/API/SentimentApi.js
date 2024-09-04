
const Sentiment_URL = "http://172.20.102.85:8000/"; 

const Summary_URL = "http://172.20.102.85:5000/";

// const Sentiment_URL = "http://192.168.20.7:8000/"; 

// const Summary_URL = "http://192.168.20.7:5000/";

class SentimentService {

Sentiment() {
    return Sentiment_URL;
  }

 Summarization() {
    return Summary_URL;
  }
}

export default new SentimentService();