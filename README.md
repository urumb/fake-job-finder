# 🛡️ AI Scam Detection + Blockchain Evidence Ledger

An AI-powered system to detect fake job postings and scam messages using NLP, with **confidence-aware decisions** and an **immutable blockchain-backed evidence ledger**.

Built with a strong focus on **safety, explainability, and auditability**.

---

## 🚀 Project Overview

Online job scams exploit job seekers by:
- Promising unrealistically high salaries
- Asking for “refundable” registration fees
- Avoiding formal hiring processes
- Using vague job descriptions and urgency tactics

This project aims to:
- Automatically **detect scam job postings** using Machine Learning
- Make **confidence-aware decisions** instead of blind predictions
- Store **tamper-proof scam evidence** on blockchain
- Enable **public verification** of reported scams

---

## 🎯 Design Philosophy

- **No irreversible actions without high confidence**
- **Uncertain predictions fail safely**
- **Scam evidence must be immutable**
- **System should be explainable and auditable**

---

## 🧠 System Architecture (High Level)

Job Text  
↓  
Text Preprocessing  
↓  
ML Model (TF-IDF + Logistic Regression)  
↓  
Confidence Gating  

├─ **SCAM (≥ 0.80)** → Blockchain Evidence Ledger  
├─ **LEGIT (≥ 0.80)** → No Action  
└─ **UNCERTAIN** → Safe Exit (No Irreversible Action)

---

## 🧩 Project Phases & Progress

### ✅ Phase 0 — Foundation
**Goal:** Project clarity & structure

- Defined problem statement and scope
- Locked tech stack
- Designed folder structure
- Planned phase-wise roadmap

**Status:** ✅ Completed

---

### ✅ Phase 1 — AI Model Development
**Goal:** Build a working scam detection model

- Created labeled scam vs legit dataset
- Implemented text preprocessing pipeline
- Trained baseline ML model  
  *(TF-IDF + Logistic Regression)*
- Built prediction pipeline
- Saved reusable trained model (`model.pkl`)

**Status:** ✅ Completed

---

### ✅ Phase 2 — Model Evaluation & Confidence
**Goal:** Understand model behavior and reliability

- Train–test split evaluation
- Accuracy measurement
- Confusion matrix analysis
- Introduced **confidence scores** instead of binary decisions

**Key Insight:**  
Accuracy alone is misleading for fraud detection — confidence matters more.

**Status:** ✅ Completed

---

### ✅ Phase 3 — Real-World Dataset Scaling
**Goal:** Improve robustness using real scam data

- Integrated real Kaggle job scam dataset
- Cleaned noisy and inconsistent text
- Balanced scam vs legit samples
- Retrained and re-evaluated model

**Status:** ✅ Completed

---

### ✅ Phase 3.4 — Confidence-Based Decision Gating
**Goal:** Prevent dangerous false positives

- Introduced confidence thresholds:
  - `SCAM ≥ 0.80`
  - `LEGIT ≥ 0.80`
- Added **UNCERTAIN** state for low-confidence predictions
- Ensured no irreversible actions occur for uncertain cases

**Status:** ✅ Completed

---

### ⛓️ Phase 4 — Blockchain Evidence Ledger
**Goal:** Ensure scam evidence cannot be altered or deleted

- Designed Solidity smart contract for scam evidence
- Deployed contract on **Ethereum Sepolia testnet**
- Store:
  - Content hash
  - Scam probability
  - Timestamp
- Integrated AI pipeline with blockchain writer
- Blockchain writes triggered **only for high-confidence scams**

**Status:** 🚧 In Progress  
✔ Smart contract deployed  
✔ AI → blockchain integration working  
⏳ IPFS storage pending

---

### 🌐 Phase 5 — Backend Integration (Planned)
**Goal:** Unified production-ready system

- FastAPI backend
- REST API for scam analysis
- Trigger blockchain logging via API
- Modular, scalable architecture

**Status:** ⏳ Planned

---


---

## 🔐 Security & Safety Notes

- `.env` files are **never committed**
- Private keys are stored only in environment variables
- Blockchain writes are **rate-limited and fail-safe**
- Prediction pipeline continues even if blockchain write fails

---

## 🧪 Current Capabilities

- Detect scam job postings with confidence scores
- Classify outputs as **SCAM / LEGIT / UNCERTAIN**
- Automatically log high-confidence scams on blockchain
- Safe failure behavior under uncertainty or RPC limits

---

## 📌 Current Status

**Current Phase:** Phase 4 — Blockchain Evidence Ledger  
**Next Milestone:** IPFS integration + public verification

---

## 📜 License

This project is for educational and research purposes.
