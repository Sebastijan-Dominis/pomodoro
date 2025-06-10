from fastapi import APIRouter, Depends, HTTPException
from database import SessionLocal
from typing import Annotated, Literal
from sqlalchemy.orm import Session
from .auth import authorization
from starlette import status
from pydantic import BaseModel
from models import PomodoroSession
from datetime import datetime, timezone, timedelta

router = APIRouter(
    prefix="/pomodoro_sessions",
    tags=["pomodoro_sessions"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(authorization)]

class PomoRequest(BaseModel):
    duration: Literal[15, 20, 25, 30, 35, 40, 45, 50, 55, 60]

class TotalDuration(BaseModel):
    total_duration: int

@router.get("/pomos-last-day", status_code=status.HTTP_200_OK, response_model=TotalDuration)
async def pomos_last_day(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization Failed.")
    
    one_day_ago = datetime.now(timezone.utc) - timedelta(days=1)
    last_day_sessions = db.query(PomodoroSession).filter(PomodoroSession.owner_id == user.get("id")).filter(PomodoroSession.created_at >= one_day_ago).all()
    
    total_duration = 0
    for session in last_day_sessions:
        total_duration += session.duration

    return {"total_duration": total_duration}

@router.get("/pomos-last-week", status_code=status.HTTP_200_OK, response_model=TotalDuration)
async def pomos_last_week(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization Failed.")
    
    one_week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    last_day_sessions = db.query(PomodoroSession).filter(PomodoroSession.owner_id == user.get("id")).filter(PomodoroSession.created_at >= one_week_ago).all()
    
    total_duration = 0
    for session in last_day_sessions:
        total_duration += session.duration

    return {"total_duration": total_duration}

@router.get("/pomos-last-month", status_code=status.HTTP_200_OK, response_model=TotalDuration)
async def pomos_last_month(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization Failed.")
    
    one_month_ago = datetime.now(timezone.utc) - timedelta(days=30)
    last_day_sessions = db.query(PomodoroSession).filter(PomodoroSession.owner_id == user.get("id")).filter(PomodoroSession.created_at >= one_month_ago).all()
    
    total_duration = 0
    for session in last_day_sessions:
        total_duration += session.duration

    return {"total_duration": total_duration}

@router.post("/create-pomo", status_code=status.HTTP_201_CREATED)
async def create_pomo(db: db_dependency, user: user_dependency, create_pomo_request: PomoRequest):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization Failed.")
    new_pomo = PomodoroSession(**create_pomo_request.model_dump(), owner_id = user.get("id"), created_at = datetime.now(timezone.utc))
    db.add(new_pomo)
    db.commit()
