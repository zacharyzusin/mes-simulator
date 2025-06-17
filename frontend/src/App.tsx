import React, { useEffect, useState } from 'react';
import { Job, JobStatus } from './types';
import { getJobs, createJob } from './api';
import JobTable from './components/JobTable';

const jobStatuses: JobStatus[] = [
  'PENDING',
  'IN_PROGRESS',
  'FAILED',
  'COMPLETED',
  'ESCALATED',
];

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobName, setJobName] = useState('');
  const [filter, setFilter] = useState<JobStatus | 'ALL'>('ALL');

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };
    fetchJobs();
    const interval = setInterval(fetchJobs, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async () => {
    if (jobName.trim() === '') return;
    await createJob(jobName);
    setJobName('');
  };

  const filteredJobs = filter === 'ALL' ? jobs : jobs.filter(job => job.status === filter);

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Factory Job Tracker</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          placeholder="New job name"
          style={{ padding: '0.5rem', fontSize: '1rem', width: '250px' }}
        />
        <button
          onClick={handleCreate}
          style={{
            padding: '0.55rem 1rem',
            marginLeft: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Create Job
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="filter" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
          Filter by status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as JobStatus | 'ALL')}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        >
          <option value="ALL">All</option>
          {jobStatuses.map((status) => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <JobTable jobs={filteredJobs} />
    </div>
  );
};

export default App;
