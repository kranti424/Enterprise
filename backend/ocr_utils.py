import pytesseract
import cv2
import numpy as np
from fastapi import UploadFile, File

# Set Tesseract Path (Windows users need this)
pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

async def extract_text(file: UploadFile):
    contents = await file.read()
    np_arr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    text = pytesseract.image_to_string(image)
    return {"extracted_text": text}
