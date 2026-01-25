🛡️ AI Scam Detection + Blockchain Evidence Ledger

An AI-powered system to detect fake job postings and scam messages using NLP, with confidence-aware decisions and an immutable blockchain-backed evidence ledger, exposed via a production-style REST API.

Built with a strong focus on safety, explainability, auditability, and real-world deployment practices.

🚀 Project Overview

Online job scams exploit job seekers by:

Promising unrealistically high salaries

Asking for “refundable” registration fees

Avoiding formal hiring processes

Using vague job descriptions and urgency tactics

This project aims to:

Automatically detect scam job postings using Machine Learning

Make confidence-aware decisions instead of blind predictions

Store tamper-proof scam evidence on blockchain

Expose detection as a clean, production-ready API

Enable public verification of reported scams

🎯 Design Philosophy

No irreversible actions without high confidence

Uncertain predictions fail safely

Scam evidence must be immutable

System should be explainable, auditable, and fault-tolerant

ML, API, and Blockchain concerns are cleanly separated

🧠 System Architecture (High Level)

Job Posting Input
↓
Text Preprocessing
↓
ML Model (TF-IDF + Logistic Regression)
↓
Confidence Gating

├─ SCAM (≥ 0.80)
│ ├─ Blockchain Evidence Ledger (Ethereum Sepolia)
│ └─ Transaction hash returned via API
├─ LEGIT (≥ 0.80) → No irreversible action
└─ UNCERTAIN → Safe exit (no blockchain write)

All logic is exposed through a FastAPI backend.

🧩 Project Phases & Progress
✅ Phase 0 — Foundation

Goal: Project clarity & structure

Defined problem statement and scope

Locked tech stack

Designed folder structure

Planned phase-wise roadmap

Status: ✅ Completed

✅ Phase 1 — AI Model Development

Goal: Build a working scam detection model

Implemented text preprocessing pipeline

Trained ML model
(TF-IDF + Logistic Regression)

Built prediction pipeline

Saved reusable trained model (model.pkl)

Status: ✅ Completed

✅ Phase 2 — Model Evaluation & Confidence

Goal: Understand model behavior and reliability

Train–test split evaluation

Accuracy measurement

Confusion matrix analysis

Introduced confidence scores instead of binary decisions

Key Insight:
Accuracy alone is misleading for fraud detection — confidence matters more.

Status: ✅ Completed

✅ Phase 3 — Real-World Dataset Scaling

Goal: Improve robustness using real scam data

Integrated Kaggle Real or Fake Job Posting dataset

Cleaned noisy and inconsistent text

Balanced scam vs legit samples

Retrained and re-evaluated model

Status: ✅ Completed

✅ Phase 3.4 — Confidence-Based Decision Gating

Goal: Prevent dangerous false positives

Introduced confidence thresholds:

SCAM ≥ 0.80

LEGIT ≥ 0.80

Added UNCERTAIN state for low-confidence predictions

Ensured no irreversible actions occur for uncertain cases

Status: ✅ Completed

⛓️ Phase 4 — Blockchain Evidence Ledger

Goal: Ensure scam evidence cannot be altered or deleted

Designed Solidity smart contract

Deployed on Ethereum Sepolia testnet

Stores:

Evidence hash

Confidence bucket

Model version

Blockchain writes triggered only for high-confidence scams

Fail-safe behavior: blockchain failures never break ML flow

Status: ✅ Completed

🌐 Phase 5 — Backend Integration

Goal: Production-ready, end-to-end system

Built FastAPI backend

Exposed /analyze-job REST API

Integrated ML inference pipeline

Integrated blockchain evidence logging

Returned blockchain transaction hash when available

Implemented clean service-based architecture

Full Swagger / OpenAPI support for testing

Status: ✅ Completed

🧪 API Capabilities
Endpoint
POST /analyze-job

Input
{
  "title": "Work From Home Data Entry",
  "description": "Earn money from home...",
  "requirements": "Basic computer skills"
}

Output
{
  "prediction": "SCAM",
  "confidence": 0.91,
  "blockchain_tx": "0xabc123..."
}


blockchain_tx is returned only for high-confidence scams

null for LEGIT or UNCERTAIN cases

🔐 Security & Safety Notes

.env files are never committed

Private keys stored only in environment variables

Blockchain writes are best-effort and fail-safe

API and ML inference continue even if blockchain RPC fails

No irreversible actions under uncertainty

📌 Current Status

Current Phase: Phase 5 — Backend Integration
System State: End-to-end ML + API + Blockchain fully operational
Next (Optional):

IPFS evidence storage

Dockerization

Frontend demo

Deployment

📜 License

This project is for educational and research purposes.