import time
import pyautogui
import cv2
import numpy as np
import pytesseract
from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from email_utils import send_email, fetch_emails
from ocr_utils import extract_text
from form_utils import fill_form
from support_ticket import process_incoming_emails, delete_resolved_tickets
from apscheduler.schedulers.background import BackgroundScheduler
from chatbot_integration import router as chatbot_router  
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

app = FastAPI()
app.include_router(chatbot_router)

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Backend API Server...")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
    
origins = [
    "http://localhost:3000",  # Your React app's URL
    "http://127.0.0.1:3000",  # Add other URLs if necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows the listed origins to access the backend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Initialize Scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(delete_resolved_tickets, "interval", seconds=10)
scheduler.start()

# Email Handling
class EmailRequest(BaseModel):
    to_email: str
    subject: str
    body: str

@app.post("/send_email/")
def send_email_api(email_request: EmailRequest):
    return send_email(email_request.to_email, email_request.subject, email_request.body)

@app.get("/fetch_emails/")
def fetch_emails_api():
    return fetch_emails()

# Trigger processing of new emails (creates support tickets)
@app.get("/process_emails/")
def process_emails_api():
    process_incoming_emails()
    return {"status": "Processed incoming emails"}

# Delete old resolved tickets
@app.delete("/delete_old_tickets/")
def delete_old_tickets_api():
    delete_resolved_tickets()
    return {"status": "Deleted expired tickets"}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Data Processing Automation API"}

# OCR Extraction Endpoint
@app.post("/extract_text/")
async def extract_text_api(file: UploadFile = File(...)):
    return extract_text(file)

# Form Filling Automation Endpoint
@app.post("/fill_form/")
def fill_form_api(data: dict):
    return fill_form(data)
