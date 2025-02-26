import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Gmail API Credentials
GMAIL_CREDENTIALS = os.getenv("GMAIL_CREDENTIALS_PATH", "C:/Users/KRANTI/Downloads/credentials.json")
TOKEN_FILE = os.getenv("TOKEN_FILE_PATH", "token.json")

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
ENTERPRISE_DB = os.getenv("ENTERPRISE_DB", "enterprise_db")
SUPPORT_TICKETS_COLLECTION = os.getenv("SUPPORT_TICKETS_COLLECTION", "support_tickets")

# Email Templates Path
TEMPLATES_DIR = os.path.join(os.getcwd(), "static", "templates")
