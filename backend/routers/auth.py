from fastapi import APIRouter, Depends, HTTPException, Path
from models import Users
from database import SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated
from starlette import status
from pydantic import BaseModel, Field
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
import os

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

load_dotenv()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
argon2_context = CryptContext(schemes=["argon2"], deprecated="auto")

class UserRequest(BaseModel):
    username: str = Field(min_length=5, max_length=25)
    password: str = Field(min_length=8, max_length=20)
    email: str = Field(min_length=8, max_length=100)

    model_config = {
        "json_schema_extra": {
            "example": {
                "username": "user's name",
                "password": "password123",
                "email": "user@gmail.com"
            }
        }
    }

def authenticate_user(email: str, password: str, db: db_dependency):
    user = db.query(Users).filter(Users.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")
    if not argon2_context.verify(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect password.")
    return user

class Token(BaseModel):
    access_token: str
    token_type: str

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def create_user_token(username: str, user_id: int):
    encoding = {"sub": username, "id": user_id, "exp": datetime.now(timezone.utc) + timedelta(minutes=60)}
    token = jwt.encode(encoding, SECRET_KEY, algorithm=ALGORITHM)
    return token

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/authorize")

def authorization(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")

        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization Failed.")
        
        return {"username": username, "id": user_id}
    
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization Failed.")

@router.post("/create-user", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: UserRequest):
    try:
        existing = db.query(Users).filter(Users.email == create_user_request.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"User with email {create_user_request.email} already exists."
            )

        new_user = Users(
            username=create_user_request.username,
            hashed_password=argon2_context.hash(create_user_request.password),
            email=create_user_request.email
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"id": new_user.id, "username": new_user.username, "email": new_user.email}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"User creation failed: {str(e)}")


@router.post("/authorize", response_model=Token)
async def authorize_user(db: db_dependency, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    email = form_data.username
    password = form_data.password
    user = authenticate_user(email, password, db)
    
    token = create_user_token(user.username, user.id)
    return {"access_token": token, "token_type": "bearer"}

# only for dev mode:
#------------------------------------------------------------
@router.get("/all-users")
async def read_users(db: db_dependency):
    return db.query(Users).all()

@router.delete("/delete-user/{user_id}")
async def delete_user(db: db_dependency, user_id: int = Path(ge=1)):
    user = db.query(Users).filter(Users.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    db.delete(user)
    db.commit()
    return {"message": "User with id {user_id} successfully deleted."}
#------------------------------------------------------------
