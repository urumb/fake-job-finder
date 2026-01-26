# IPFS Evidence Storage

This project uses IPFS to store full scam text off-chain.

## Why IPFS?
- Blockchain storage is expensive and public
- Full scam content may contain sensitive data
- IPFS provides content-addressed, immutable storage

## What is stored
- Full scam text → IPFS
- Returned CID is stored on-chain alongside:
  - Text hash
  - Confidence score
  - Timestamp

## Privacy model
- Blockchain never stores raw text
- Anyone can verify integrity using:
  - Original text → hash → compare with on-chain hash
  - IPFS CID → fetch content (if authorized)

## Status
Implemented as optional, best-effort storage.
Failure to upload does not block ML or blockchain logging.
