// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// This contract is used to store proof (hashes) of scam job postings.
// The AI model runs off-chain and decides if something is a scam.
// If the confidence is high enough, only then we store the evidence here.
// Blockchain is just for record-keeping, not decision-making.

contract ScamLedger {

    // This struct holds all info related to one scam record
    struct Evidence {
        bytes32 evidenceHash;     // hash generated off-chain (job text + model output)
        uint256 timestamp;        // when this evidence was recorded
        uint8 confidenceBucket;   // 1–4 (higher bucket = higher confidence)
        string modelVersion;      // which ML model version was used
        address reporter;         // who submitted this record
    }

    // Maps evidence hash to stored evidence
    mapping(bytes32 => Evidence) private evidenceStore;

    // Used to make sure the same hash is not stored twice
    mapping(bytes32 => bool) private evidenceExists;

    // Emitted whenever a new scam record is added
    event ScamRecorded(
        bytes32 indexed evidenceHash,
        uint256 timestamp,
        uint8 confidenceBucket,
        address indexed reporter
    );

    // Called after the AI system flags a job as a high-confidence scam
    function recordScamEvidence(
        bytes32 _evidenceHash,
        uint8 _confidenceBucket,
        string calldata _modelVersion
    ) external {
        // basic checks
        require(_evidenceHash != bytes32(0), "invalid hash");
        require(!evidenceExists[_evidenceHash], "already recorded");
        require(
            _confidenceBucket >= 1 && _confidenceBucket <= 4,
            "invalid confidence bucket"
        );

        // create and store the evidence
        evidenceStore[_evidenceHash] = Evidence({
            evidenceHash: _evidenceHash,
            timestamp: block.timestamp,
            confidenceBucket: _confidenceBucket,
            modelVersion: _modelVersion,
            reporter: msg.sender
        });

        evidenceExists[_evidenceHash] = true;

        // emit event so it can be tracked on explorers
        emit ScamRecorded(
            _evidenceHash,
            block.timestamp,
            _confidenceBucket,
            msg.sender
        );
    }

    // Anyone can read stored evidence using the hash
    function getEvidence(bytes32 _evidenceHash)
        external
        view
        returns (Evidence memory)
    {
        require(evidenceExists[_evidenceHash], "not found");
        return evidenceStore[_evidenceHash];
    }
}
