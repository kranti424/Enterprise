import os
import base64
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Define the required scopes
SCOPES = ["https://www.googleapis.com/auth/gmail.send", "https://www.googleapis.com/auth/gmail.readonly"]

# Paths for credentials and token storage
CREDENTIALS_FILE = "C:/Users/KRANTI/Downloads/credentials.json"
TOKEN_FILE = "token.json"

def authenticate_gmail():
    """Authenticate the user and return Gmail API service."""
    creds = None

    # Load existing token if available
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    # If token is invalid, perform OAuth login
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        # Save the new token for future use
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())

    return build("gmail", "v1", credentials=creds)

def send_email(to_email, subject, body):
    """Send an email using Gmail API."""
    try:
        service = authenticate_gmail()
        message = MIMEText(body)
        message["to"] = to_email if isinstance(to_email, str) else ", ".join(to_email)  # ✅ Correct

        message["subject"] = subject

        raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode("utf-8")
        sent_message = service.users().messages().send(userId="me", body={"raw": raw_message}).execute()

        return {"status": "Email sent successfully", "message_id": sent_message["id"]}
    
    except Exception as e:
        return {"error": f"Failed to send email: {str(e)}"}

def fetch_emails():
    """Fetch the latest unread emails."""
    try:
        service = authenticate_gmail()
        results = service.users().messages().list(userId="me", labelIds=["INBOX"], q="is:unread").execute()
        messages = results.get("messages", [])

        if not messages:
            return {"message": "No new emails"}

        email_list = []
        for msg in messages:
            msg_data = service.users().messages().get(userId="me", id=msg["id"], format="full").execute()
            headers = msg_data["payload"]["headers"]
            subject = next((h["value"] for h in headers if h["name"] == "Subject"), "No Subject")
            sender = next((h["value"] for h in headers if h["name"] == "From"), "Unknown Sender")

            email_list.append({"from": sender, "subject": subject})

        return {"emails": email_list}
    
    except Exception as e:
        return {"error": f"Failed to fetch emails: {str(e)}"}
