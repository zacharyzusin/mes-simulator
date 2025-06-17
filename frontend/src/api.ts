import axios from 'axios';
import { Job } from './types';

const BASE_URL = 'http://localhost:8000';

export const getJobs = async (): Promise<Job[]> => {
  const response = await axios.get(`${BASE_URL}/jobs/`);
  return response.data;
};

export const createJob = async (name: string): Promise<Job> => {
  const response = await axios.post(`${BASE_URL}/jobs/`, null, {
    params: { name }
  });
  return response.data;
};
