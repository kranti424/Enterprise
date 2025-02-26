import pymongo
from utils.config import MONGO_URI, ENTERPRISE_DB

def get_mongo_client():
    """Establish connection with MongoDB."""
    client = pymongo.MongoClient(MONGO_URI)
    return client

db_client = get_mongo_client()
db = db_client[ENTERPRISE_DB]
