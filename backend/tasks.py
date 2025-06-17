import asyncio
from .database import SessionLocal
from .models import Job, JobStatus
from .workflow import process_job

async def job_worker():
    while True:
        print("Running background job check...")
        db = SessionLocal()
        jobs = db.query(Job).filter(Job.status.in_([
            JobStatus.PENDING,
            JobStatus.IN_PROGRESS,
            JobStatus.FAILED
        ])).all()

        for job in jobs:
            process_job(job)
        db.commit()
        db.close()

        await asyncio.sleep(5)
