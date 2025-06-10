from fastapi import FastAPI
import models
from database import engine
from routers.auth import router as auth_router

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

routers = [auth_router]
for router in routers:
    app.include_router(router)