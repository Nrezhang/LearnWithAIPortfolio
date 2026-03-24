from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.about import router as about_router

app = FastAPI()

app.include_router(about_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],#for development, in production specify the allowed origins
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}