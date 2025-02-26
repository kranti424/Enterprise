import time
import pyautogui
from fastapi import HTTPException

def fill_form(data: dict):
    try:
        time.sleep(3)
        for key, value in data.items():
            pyautogui.write(value)
            pyautogui.press("tab")
        pyautogui.press("enter")
        return {"status": "Form filled successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
