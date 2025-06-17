export type JobStatus = 'PENDING' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED' | 'ESCALATED';

export interface Job {
  id: number;
  name: string;
  status: JobStatus;
  retries: number;
}