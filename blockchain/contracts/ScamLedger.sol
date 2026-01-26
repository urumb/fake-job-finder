// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
    ScamLedger — Blockchain Evidence Ledger

    Purpose:
    - Store immutable proof that a job posting was classified as a scam
    - AI decision-making happens off-chain
    - Blockchain is used ONLY for verifiable record-keeping

    Privacy-first design:
    - No raw job text is stored on-chain
    - Full text is stored off-chain on IPFS
    - Only hashes + metadata are recorded on-chain
*/

contract ScamLedger {

    // Represents one immutable scam evidence record
    struct Evidence {
        bytes32 evidenceHash;     // Hash of job text (and optionally model output)
        string ipfsCid;           // IPFS CID pointing to full off-chain text
        uint256 timestamp;        // When the evidence was recorded
        uint8 confidenceBucket;   // 1–4 (higher = more confident)
        string modelVersion;      // ML model version used
        address reporter;         // Address that submitted the record
    }

    // Maps evidence hash to its stored record
    mapping(bytes32 => Evidence) private evidenceStore;

    // Prevents duplicate entries
    mapping(bytes32 => bool) private evidenceExists;

    // Emitted when a new scam record is stored
    event ScamRecorded(
        bytes32 indexed evidenceHash,
        string ipfsCid,
        uint256 timestamp,
        uint8 confidenceBucket,
        address indexed reporter
    );

    /*
        Called only after:
        - ML model classifies job as SCAM
        - Confidence threshold is met off-chain
        - Full text is uploaded to IPFS
    */
    function recordScamEvidence(
        bytes32 _evidenceHash,
        string calldata _ipfsCid,
        uint8 _confidenceBucket,
        string calldata _modelVersion
    ) external {
        // Basic validation
        require(_evidenceHash != bytes32(0), "invalid hash");
        require(!evidenceExists[_evidenceHash], "already recorded");
        require(bytes(_ipfsCid).length > 0, "empty IPFS CID");
        require(
            _confidenceBucket >= 1 && _confidenceBucket <= 4,
            "invalid confidence bucket"
        );

        // Store the evidence
        evidenceStore[_evidenceHash] = Evidence({
            evidenceHash: _evidenceHash,
            ipfsCid: _ipfsCid,
            timestamp: block.timestamp,
            confidenceBucket: _confidenceBucket,
            modelVersion: _modelVersion,
            reporter: msg.sender
        });

        evidenceExists[_evidenceHash] = true;

        // Emit event for off-chain indexing & explorers
        emit ScamRecorded(
            _evidenceHash,
            _ipfsCid,
            block.timestamp,
            _confidenceBucket,
            msg.sender
        );
    }

    // Public read access using the evidence hash
    function getEvidence(bytes32 _evidenceHash)
        external
        view
        returns (Evidence memory)
    {
        require(evidenceExists[_evidenceHash], "not found");
        return evidenceStore[_evidenceHash];
    }
}
