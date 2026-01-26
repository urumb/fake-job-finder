# 🛡️ AI Scam Detection + Blockchain Evidence Ledger

A production-style system that detects fake job postings using Machine Learning and records **high-confidence scam evidence immutably on blockchain**, with confidence-aware safety controls.

---

## 🚀 Project Overview

Online job scams exploit job seekers by promising easy income, demanding registration fees, or guaranteeing jobs without interviews.  
This project addresses that problem by building a **safe, explainable, and auditable system** that focuses on correctness and real-world behavior rather than just model accuracy.

The system is designed as a **backend-first architecture**, exposing clean APIs that can be consumed by any client or UI.

---

## 🧠 Key Features

- 🔍 **ML-based scam detection** using NLP  
- ⚖️ **Confidence-aware predictions**: `SCAM`, `LEGIT`, `UNCERTAIN`  
- 🚫 **Uncertain predictions never trigger irreversible actions**  
- ⛓️ **Blockchain evidence ledger** for high-confidence scams  
- 📦 **Off-chain content storage** via IPFS  
- 🌐 **FastAPI backend** acting as an orchestration layer  
- 🧩 Modular, explainable, and extensible design  

---

## 🏗️ High-Level Architecture

```text
Client / API Consumer
        ↓
FastAPI Backend
        ↓
ML Inference Engine
        ↓
Confidence-Based Decision Gating
        ↓
Blockchain Evidence Ledger (High-confidence scams only)
        ↓
IPFS (Full content storage)


🧩 Project Phases

✅ Phase 0 — Foundation

Problem definition and scope locking

Tech stack selection

Phase-wise roadmap planning

✅ Phase 1 — AI Model Development

Text preprocessing pipeline

TF-IDF feature extraction

Logistic Regression baseline model

End-to-end prediction pipeline

✅ Phase 2 — Evaluation & Metrics

Train/test split

Accuracy and confusion matrix

Precision and recall analysis

Understanding false positives vs false negatives

✅ Phase 3 — Real-World Dataset Scaling

Integrated Kaggle Fake Job Postings dataset (~17,880 samples)

Unified text field from title + description + requirements

Class imbalance handling using weighted training

Achieved strong scam recall on real-world data

✅ Phase 3.4 — Confidence-Based Decision Gating

Probability-based predictions

Strict confidence thresholds:

SCAM if P(scam) ≥ 0.80

LEGIT if P(legit) ≥ 0.80

Otherwise → UNCERTAIN

Low-confidence predictions are safely ignored

✅ Phase 4 — Blockchain Evidence Ledger

Smart contract for immutable scam logging

Minimal on-chain storage:

Content hash

IPFS CID

Confidence score

Timestamp

Only high-confidence scams are written on-chain

✅ Phase 5 — Backend Integration

FastAPI backend with /analyze endpoint

ML inference + confidence gating

Conditional blockchain interaction

Graceful handling of blockchain failures

📌 Current Project Status
Status: COMPLETE (Core System)

ML:
- Real-world trained
- Imbalance-aware
- Confidence-gated

Blockchain:
- High-confidence scam evidence ledger
- Testnet-based deployment

Backend:
- Clean API
- Safe orchestration layer

UI:
- Optional (intentionally decoupled)

🛠️ Tech Stack

Language: Python

Machine Learning / NLP: scikit-learn, TF-IDF

Backend: FastAPI

Blockchain: Ethereum testnet (smart contracts)

Storage: IPFS

Version Control: Git & GitHub

## ⚙️ Setup

Clone the repository and install dependencies:

```bash
pip install -r requirements.txt

🎯 Design Principles

Safety over blind automation

Confidence before irreversible actions

Minimal on-chain data

Explainable ML decisions

Modular, production-style architecture

📖 Example API Output
{
  "prediction": "SCAM",
  "confidence": 0.96,
  "blockchain_logged": true,
  "tx_hash": "0xabc123..."
}


UNCERTAIN predictions do not trigger blockchain writes.

🧑‍💻 Author Notes

This project was built incrementally with phase-wise commits to reflect real-world engineering workflows.
The focus is on correctness, safety, and auditability, not UI polish.