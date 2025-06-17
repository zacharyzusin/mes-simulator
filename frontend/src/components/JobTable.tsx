import React from 'react';
import { Job } from '../types';

interface Props {
  jobs: Job[];
}

const JobTable: React.FC<Props> = ({ jobs }) => {
  return (
    <table className="job-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Retries</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.id}</td>
            <td>{job.name}</td>
            <td>{job.status}</td>
            <td>{job.retries}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobTable;
