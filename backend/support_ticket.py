import pymongo
import uuid
from datetime import datetime, timedelta
from email_utils import send_email, fetch_emails
from mongo_setup import get_mongo_client

# Connect to MongoDB
db_client = get_mongo_client()
db = db_client['enterprise_db']
tickets_collection = db['support_tickets']

def generate_ticket_id():
    """Generate a unique Ticket ID."""
    return str(uuid.uuid4())[:8]

def store_ticket(sender, subject, body):
    """Store ticket details in MongoDB."""
    ticket_id = generate_ticket_id()
    ticket_data = {
        "ticket_id": ticket_id,
        "sender": sender,
        "subject": subject,
        "body": body,
        "status": "Open",
        "created_at": datetime.utcnow(),
        "expiry_at": datetime.utcnow() + timedelta(hours=24)
    }
    tickets_collection.insert_one(ticket_data)
    return ticket_id

from datetime import datetime, timedelta

def process_incoming_emails():
    """Fetch emails, generate ticket IDs only if relevant, and auto-reply once per email (last 24 hours)."""
    emails = fetch_emails()
    
    if "emails" in emails:
        now = datetime.utcnow()
        last_24_hours = now - timedelta(hours=24)

        for email in emails["emails"]:
            sender = email["from"]
            subject = email["subject"]
            body = email["body"]
            email_timestamp = email.get("timestamp")  # Assuming we get timestamp in UTC

            # **Step 1: Convert Email Timestamp to Datetime**
            if email_timestamp:
                email_datetime = datetime.strptime(email_timestamp, "%Y-%m-%dT%H:%M:%SZ")  # Adjust format if needed
                if email_datetime < last_24_hours:
                    print(f"Skipping email from {sender}: Older than 24 hours")
                    continue  # Skip old emails
            
            # **Step 2: Avoid Duplicate Responses**
            existing_ticket = tickets_collection.find_one({"sender": sender, "subject": subject})
            if existing_ticket:
                print(f"Skipping email from {sender}: Already processed")
                continue  # Skip this email

            # **Step 3: Filter Relevant Emails**
            relevant_keywords = ["support", "help", "issue", "query", "complaint", "ticket"]
            if not any(keyword in subject.lower() or keyword in body.lower() for keyword in relevant_keywords):
                print(f"Skipping email from {sender}: No relevant keywords found")
                continue  # Skip if no relevant keywords

            # **Step 4: Create Support Ticket**
            ticket_id = store_ticket(sender, subject, body)
            auto_reply_body = f"Your support request has been received. Your Ticket ID: {ticket_id}.\n\nWe will get back to you shortly."

            # **Step 5: Send Auto-Reply**
            send_email(sender, "Support Ticket Confirmation", auto_reply_body)
            print(f"Ticket {ticket_id} created for {sender}")


def delete_resolved_tickets():
    """Delete tickets older than 10 seconds (for testing)."""
    now = datetime.utcnow()
    time_threshold = now - timedelta(seconds=10)  # Change to 10 seconds
    tickets_collection.delete_many({"expiry_at": {"$lt": time_threshold}})
