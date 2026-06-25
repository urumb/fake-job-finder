import axios from 'axios';
import { JobRequest, JobResponse } from '../types';

// Assuming the backend is running on localhost:8000
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobService = {
  analyzeJob: async (data: JobRequest): Promise<JobResponse> => {
    try {
      const response = await api.post<JobResponse>('/analyze-job/', data);
      return response.data;
    } catch (error) {
      console.error('Error analyzing job:', error);
      throw error;
    }
  },
};
