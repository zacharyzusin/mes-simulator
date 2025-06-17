from .models import Job, JobStatus
from sqlalchemy.orm import Session
import random

MAX_RETRIES = 3

def process_job(job: Job):
    if job.status == JobStatus.PENDING:
        job.status = JobStatus.IN_PROGRESS

    elif job.status == JobStatus.IN_PROGRESS:
        if random.random() < 0.2:  # 20% chance of failure
            job.status = JobStatus.FAILED
            job.retries += 1
        else:
            job.status = JobStatus.COMPLETED

    elif job.status == JobStatus.FAILED:
        if job.retries < MAX_RETRIES:
            job.status = JobStatus.IN_PROGRESS
        else:
            job.status = JobStatus.ESCALATED
