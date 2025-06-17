from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .models import Job, JobStatus, Base
from .database import engine, SessionLocal
from .tasks import job_worker
import asyncio

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(job_worker())
    
@app.post("/jobs/")
def create_job(name: str, db: Session = Depends(get_db)):
    job = Job(name=name)
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

@app.get("/jobs/")
def list_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()