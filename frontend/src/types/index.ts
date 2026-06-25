export type JobPrediction = "SCAM" | "LEGIT" | "UNCERTAIN";

export interface JobRequest {
  title: string;
  description: string;
  requirements: string;
}

export interface JobResponse {
  prediction: JobPrediction;
  confidence: number;
  blockchain_tx: string | null;
}

export interface ScanResult extends JobResponse {
  id: string;
  timestamp: string;
  jobDetails: JobRequest;
}

export interface SystemStats {
  totalScans: number;
  scamsDetected: number;
  blockchainVerifications: number;
  accuracy: number;
}
