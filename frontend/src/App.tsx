import React, { useEffect, useState } from 'react';
import { Job } from './types';
import { getJobs, createJob } from './api';
import JobTable from './components/JobTable';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobName, setJobName] = useState('');

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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Factory Job Tracker</h1>
      <input
        type="text"
        value={jobName}
        onChange={(e) => setJobName(e.target.value)}
        placeholder="New job name"
      />
      <button onClick={handleCreate}>Create Job</button>
      <JobTable jobs={jobs} />
    </div>
  );
};

export default App;
