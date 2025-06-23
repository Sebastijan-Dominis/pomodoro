from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
import models
from database import engine
from routers.auth import router as auth_router
from routers.pomodoro_sessions import router as pomodoro_sessions_router
from routers.users import router as users_router
from dotenv import load_dotenv
import os

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("API_URL")],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

routers = [auth_router, pomodoro_sessions_router, users_router]
for router in routers:
    app.include_router(router)