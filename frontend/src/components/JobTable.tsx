import React from 'react';
import { Job } from '../types';

interface Props {
  jobs: Job[];
}

const statusProgressMap: Record<string, number> = {
  'PENDING': 0,
  'IN_PROGRESS': 50,
  'FAILED': 50,
  'ESCALATED': 75,
  'COMPLETED': 100,
};

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
          <tr key={job.id} style={{ backgroundColor: job.status === 'FAILED' || job.status === 'ESCALATED' ? '#ffe6e6' : 'white' }}>
            <td style={tdStyle}>{job.id}</td>
            <td style={tdStyle}>{job.name}</td>
            <td style={tdStyle}>{job.status.replace('_', ' ')}</td>
            <td style={tdStyle}>
              <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '16px', width: '100%' }}>
                <div
                  style={{
                    width: `${statusProgressMap[job.status]}%`,
                    height: '100%',
                    borderRadius: '4px',
                    backgroundColor: getProgressColor(job.status),
                    transition: 'width 0.3s ease-in-out',
                  }}
                />
              </div>
            </td>
            <td style={tdStyle}>
              <RetryBadge retries={job.retries} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getProgressColor = (status: string): string => {
  switch (status) {
    case 'COMPLETED':
      return '#4caf50';
    case 'IN_PROGRESS':
      return '#2196f3';
    case 'FAILED':
      return '#f44336';
    case 'ESCALATED':
      return '#ff9800';
    default:
      return '#bdbdbd';
  }
};

const thStyle: React.CSSProperties = {
  borderBottom: '2px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  borderBottom: '1px solid #eee',
  padding: '8px',
  verticalAlign: 'middle',
};

interface RetryBadgeProps {
  retries: number;
}

const RetryBadge: React.FC<RetryBadgeProps> = ({ retries }) => {
  let color = '#bbb';
  let label = retries.toString();

  if (retries === 0) {
    return <span style={{ color: '#4caf50' }}>None</span>;
  }
  if (retries > 0 && retries < 3) {
    color = '#ffb300';
  }
  if (retries >= 3) {
    color = '#f44336';
    label = `⚠️ ${retries}`;
  }

  return (
    <span
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '2px 6px',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        display: 'inline-block',
        minWidth: '28px',
        textAlign: 'center',
      }}
      title={retries >= 3 ? 'High retry count - please investigate' : undefined}
    >
      {label}
    </span>
  );
};


export default JobTable;
