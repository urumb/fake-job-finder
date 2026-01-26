# handles writing high-confidence scam evidence to blockchain
# failure here should never break ML predictions

import os
import json
import hashlib
import requests
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

# ======================
# Environment variables
# ======================
SEPOLIA_RPC_URL = os.getenv("SEPOLIA_RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

PINATA_API_KEY = os.getenv("PINATA_API_KEY")
PINATA_SECRET_KEY = os.getenv("PINATA_SECRET_KEY")

CONTRACT_ADDRESS = "0x12EE9Edad14Fc93ef905DBB0D36AbA9c4D5F113b"
MODEL_VERSION = "tfidf-logreg-v1"

# ======================
# Contract ABI (updated)
# ======================
CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "bytes32", "name": "_evidenceHash", "type": "bytes32"},
            {"internalType": "string", "name": "_ipfsCid", "type": "string"},
            {"internalType": "uint8", "name": "_confidenceBucket", "type": "uint8"},
            {"internalType": "string", "name": "_modelVersion", "type": "string"},
        ],
        "name": "recordScamEvidence",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    }
]

w3 = Web3(Web3.HTTPProvider(SEPOLIA_RPC_URL))

# ======================
# Helpers
# ======================
def confidence_bucket(prob: float) -> int:
    if prob >= 0.95:
        return 4
    elif prob >= 0.90:
        return 3
    elif prob >= 0.85:
        return 2
    else:
        return 1


def generate_evidence_hash(text: str, label: str, prob: float) -> bytes:
    payload = f"{text}|{label}|{round(prob,2)}|{MODEL_VERSION}"
    return hashlib.sha256(payload.encode()).digest()


def upload_to_ipfs(text: str, prob: float) -> str:
    """
    Uploads full scam evidence to IPFS via Pinata.
    Returns CID.
    """
    url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

    headers = {
        "Content-Type": "application/json",
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_SECRET_KEY,
    }

    payload = {
        "model_version": MODEL_VERSION,
        "prediction": "SCAM",
        "confidence": round(prob, 4),
        "job_text": text,
    }

    response = requests.post(url, headers=headers, json=payload, timeout=15)
    response.raise_for_status()

    return response.json()["IpfsHash"]

# ======================
# Main writer
# ======================
def write_scam_to_blockchain(text: str, prob: float):
    # HARD GATE — never log low confidence
    if prob < 0.80:
        return None

    try:
        acct = w3.eth.account.from_key(PRIVATE_KEY)

        contract = w3.eth.contract(
            address=Web3.to_checksum_address(CONTRACT_ADDRESS),
            abi=CONTRACT_ABI,
        )

        # 1️⃣ Upload full text to IPFS
        ipfs_cid = upload_to_ipfs(text, prob)

        # 2️⃣ Generate immutable hash
        evidence_hash = generate_evidence_hash(text, "scam", prob)
        bucket = confidence_bucket(prob)

        # 3️⃣ Build transaction
        tx = contract.functions.recordScamEvidence(
            evidence_hash,
            ipfs_cid,
            bucket,
            MODEL_VERSION,
        ).build_transaction({
            "from": acct.address,
            "nonce": w3.eth.get_transaction_count(acct.address),
            "gas": 250_000,
            "gasPrice": w3.eth.gas_price,
        })

        signed = acct.sign_transaction(tx)
        tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)

        tx_hex = tx_hash.hex()
        print(f"[BLOCKCHAIN] Evidence written: {tx_hex}")
        print(f"[IPFS] CID: {ipfs_cid}")

        return {
            "tx_hash": tx_hex,
            "ipfs_cid": ipfs_cid,
        }

    except Exception as e:
        # Best-effort only — ML must never fail
        print(f"[BLOCKCHAIN] write failed (ignored): {e}")
        return None
