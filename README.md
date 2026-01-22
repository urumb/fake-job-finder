# 🛡️ AI Scam Detection + Blockchain Evidence Ledger

An AI-powered system to detect fake job postings and scam messages using NLP, with a roadmap to store immutable scam evidence on blockchain for transparency and trust.

---

## 🚀 Project Overview

Online job scams exploit job seekers by demanding registration fees, guaranteeing jobs without interviews, or using informal communication channels.

This project aims to:
- Automatically **detect scam job postings** using Machine Learning
- Provide **confidence-aware predictions** instead of blind decisions
- (Upcoming) Store **tamper-proof scam evidence** on blockchain
- (Upcoming) Enable verifiable and auditable scam reporting

---

## 🧩 Project Phases & Roadmap

### ✅ Phase 0 — Foundation
**Goal:** Project clarity & structure

- Defined problem statement and scope
- Locked tech stack
- Created clean folder structure
- Planned phase-wise development

**Status:** ✅ Completed

---

### ✅ Phase 1 — AI Model Development
**Goal:** Build a working scam detection model

- Created labeled dataset
- Implemented text preprocessing
- Trained baseline ML model (TF-IDF + Logistic Regression)
- Built prediction pipeline
- Saved reusable trained model

**Status:** ✅ Completed

---

### ✅ Phase 2 — Model Evaluation & Confidence
**Goal:** Understand model behavior and limitations

- Train–test split evaluation
- Accuracy measurement
- Confusion matrix analysis
- Confidence thresholding to flag uncertain predictions

**Key Insight:**  
Accuracy alone is misleading on small datasets — confusion matrix and confidence scores are critical for fraud detection.

**Status:** ✅ Completed

---

### 🔄 Phase 3 — Real-World Dataset Scaling
**Goal:** Improve model reliability using real data

- Integrate real Kaggle job scam dataset
- Clean and normalize noisy text data
- Balance scam vs legit samples
- Retrain and re-evaluate model

**Status:** ⏳ Upcoming

---

### ⛓️ Phase 4 — Blockchain Evidence Ledger
**Goal:** Ensure scam reports cannot be altered or deleted

- Design smart contract for scam evidence
- Store content hash and confidence on blockchain testnet
- Store full scam content on IPFS
- Enable public verification of scam reports

**Status:** ⏳ Planned

---

### 🌐 Phase 5 — Backend Integration
**Goal:** Connect AI and blockchain into a unified system

- FastAPI backend
- API endpoint for scam analysis
- Trigger blockchain logging for detected scams
- Modular and scalable system design

**Status:** ⏳ Planned

---

## 📌 Current Project Status

```text
Current Phase: Phase 2 — Model Evaluation & Confidence

Completed:
- Phase 0: Foundation
- Phase 1: AI Model Development
- Phase 2: Evaluation & Confidence Handling

Next:
- Phase 3: Train model on real-world Kaggle dataset
