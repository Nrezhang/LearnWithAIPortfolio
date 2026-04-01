import os
from dotenv import load_dotenv

load_dotenv()

NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

MESSAGE_LIMITS = {
    "learn": 3,
    "interview": 2,
}