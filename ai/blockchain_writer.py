# handles writing high-confidence scam evidence to blockchain
# failure here should never break ML predictions

import os
import hashlib
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

SEPOLIA_RPC_URL = os.getenv("SEPOLIA_RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CONTRACT_ADDRESS = "0x12EE9Edad14Fc93ef905DBB0D36AbA9c4D5F113b"
MODEL_VERSION = "tfidf-logreg-v1"

# ABI trimmed to only what we use
CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "bytes32", "name": "_evidenceHash", "type": "bytes32"},
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

def write_scam_to_blockchain(text: str, prob: float):
    if prob < 0.80:
        return None  # hard gate

    try:
        acct = w3.eth.account.from_key(PRIVATE_KEY)
        contract = w3.eth.contract(
            address=Web3.to_checksum_address(CONTRACT_ADDRESS),
            abi=CONTRACT_ABI,
        )

        evidence_hash = generate_evidence_hash(text, "scam", prob)
        bucket = confidence_bucket(prob)

        tx = contract.functions.recordScamEvidence(
            evidence_hash,
            bucket,
            MODEL_VERSION,
        ).build_transaction({
            "from": acct.address,
            "nonce": w3.eth.get_transaction_count(acct.address),
            "gas": 200_000,
            "gasPrice": w3.eth.gas_price,
        })

        signed = acct.sign_transaction(tx)
        tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)

        tx_hex = tx_hash.hex()
        print(f"[BLOCKCHAIN] Evidence written: {tx_hex}")

        return tx_hex

    except Exception as e:
        # best-effort only; never break ML
        print(f"[BLOCKCHAIN] write failed (ignored): {e}")
        return None
