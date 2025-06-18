# Factory Workflow Tracker

A lightweight Manufacturing Execution System (MES)-inspired web app simulating job orchestration and monitoring in a factory environment.

## Features

### Job Management
- Users can create new jobs via a simple input field.
- Jobs are persisted in the backend and regularly refreshed.

### State Visualization
- Progress bars reflect the job’s current status (`PENDING` → `IN_PROGRESS` → `ESCALATED` → `COMPLETED`)
- Color-coded for clarity: green (success), red (failure), blue (in progress), orange (attention)

### Retry Counts
- Jobs have a 20% failure rate and are retried after each such failure
- Jobs with 3 or more retries shown with warning icons and color emphasis

### Status Filtering
- Dropdown filter enables users to sort jobs by status
- Supports all defined states (PENDING, IN_PROGRESS, etc.)

## Tech Stack
- Frontend: React, TypeScript
- Backend: Python, FastAPI
- Database: PostgreSQL

## Setup Instructions

These instructions assume you're running on macOS or Linux with **Python 3.9+**, **Node.js 18+**, and **PostgreSQL** installed.

### 1. Clone the Repository

```
git clone https://github.com/zacharyzusin/mes-simulator.git
```

2. Backend Setup
```

# Create and activate a Python virtual environment
python -m venv venv
source venv/bin/activate

# Navigate to the backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Ensure PostgreSQL is running locally and create the database
psql -U postgres -c "CREATE DATABASE mes_db;"

# Start the FastAPI backend server
uvicorn backend.main:app --reload
```

3. Frontend Setup
```
# Navigate to the frontend folder
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## File Structure
```
├── backend/
│   ├── main.py         # runs the FastAPI server
│   ├── database.py     # sets up SQLAlchemy connection to Postgres DB
│   ├── models.py       # Job data model schema
│   ├── tasks.py        # Background process simulating task execution
│   └── workflow.py     # State transitions & retry logic
├── frontend/
│   ├── src/
│   │   ├── App.tsx      # Main app logic
│   │   ├── api.ts       # Axios API calls to backend
│   │   ├── components/
│   │   │   └── JobTable.tsx # Table to display jobs
│   │   └── types.ts     # Shared types for Job objects
├── README.md
```
