from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from transformers import pipeline
from transformers.pipelines import ConversationalPipeline


app = FastAPI()
router = APIRouter()


@router.get("/chatbot")
async def chatbot_response(query: str):
    return {"response": f"Chatbot received: {query}"}

class ChatRequest(BaseModel):
    message: str

# Load a pretrained chatbot model
chatbot = pipeline("conversational", model="microsoft/DialoGPT-medium")

# Predefined responses
responses = {
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi there! How can I help?",
    "how are you": "I'm just a bot, but I'm here to assist you!",
    "what is your name": "I'm a chatbot created to help you!",
    "services": "We offer customer support, product inquiries, and order assistance.",
    "pricing": "Our pricing depends on the product. Please specify what you're interested in.",
    "order status": "Please provide your order ID, and I'll check the status for you.",
    "support": "You can contact our support team at support@example.com.",
    "bye": "Goodbye! Have a great day!",
}

@app.post("/chat")
def chat(request: ChatRequest):
    user_message = request.message.lower().strip()

    # First, check if it's a predefined response
    for key in responses:
        if key in user_message:
            return {"response": responses[key]}

    # Otherwise, use AI-generated response
    conversation = Conversation(user_message)
    response = chatbot(conversation)

    return {"response": response.generated_responses[-1]}
