from database import Base
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    hashed_password = Column(String, unique=True)

class PomodoroSession(Base):
    __tablename__ = "pomodoro_session"

    id = Column(Integer, primary_key=True, index=True)
    duration = Column(Integer)
    created_at = Column(DateTime)
    owner_id = Column(Integer, ForeignKey("users.id"))