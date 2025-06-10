from fastapi import APIRouter, Depends, HTTPException
from .auth import authorization
from typing import Annotated
from database import SessionLocal
from starlette import status
from models import Users
from sqlalchemy.orm import Session

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

user_dependency = Annotated[dict, Depends(authorization)]

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("/current")
async def get_current_user(db: db_dependency, user: user_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Failed Authorization.")

    current_user = db.query(Users).filter(Users.id == user.get("id")).first()
    return current_user
