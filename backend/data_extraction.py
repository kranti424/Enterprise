import os
import pymongo
import pytesseract
from pdf2image import convert_from_path
from PIL import Image

# MongoDB connection
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "ocr_data"
COLLECTION_NAME = "extracted_text"

client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def extract_text_from_pdf(pdf_path):
    images = convert_from_path(pdf_path)
    extracted_text = ""
    
    for image in images:
        text = pytesseract.image_to_string(image)
        extracted_text += text + "\n"
    
    return extracted_text.strip()

def save_to_mongo(file_name, extracted_text):
    data = {"file_name": file_name, "extracted_text": extracted_text}
    collection.insert_one(data)
    print("Data saved to MongoDB successfully.")

if __name__ == "__main__":
    pdf_path = "D:/enterprise/Enterprise/samples/sample_invoice.pdf"
    if os.path.exists(pdf_path):
        extracted_text = extract_text_from_pdf(pdf_path)
        save_to_mongo(os.path.basename(pdf_path), extracted_text)
    else:
        print("File not found!")
