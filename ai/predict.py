import pickle
from preprocess import clean_text
from blockchain_writer import write_scam_to_blockchain

# Confidence thresholds
SCAM_THRESHOLD = 0.80
LEGIT_THRESHOLD = 0.80

# Load trained model and vectorizer
with open("model.pkl", "rb") as f:
    model, vectorizer = pickle.load(f)


def predict_job(text: str):
    clean = clean_text(text)
    vec = vectorizer.transform([clean])

    probs = model.predict_proba(vec)[0]
    prob_legit = probs[0]
    prob_scam = probs[1]

    # decide label first (ML is authoritative)
    if prob_scam >= SCAM_THRESHOLD:
        label = "SCAM"
        confidence = prob_scam
    elif prob_legit >= LEGIT_THRESHOLD:
        label = "LEGIT"
        confidence = prob_legit
    else:
        label = "UNCERTAIN"
        confidence = max(prob_legit, prob_scam)

    # 🔗 blockchain side-effect (safe, best-effort)
    # only writes if prob_scam >= 0.80
    write_scam_to_blockchain(clean, prob_scam)

    return label, confidence


if __name__ == "__main__":
    samples = [
        # 🔴 High-confidence scam
        """Work From Home Data Entry Executive.
        We are hiring candidates for part-time work from home.
        Earn between 35000 to 55000 per month.
        To confirm your selection, a one-time refundable registration fee is required.
        Limited slots available. Apply immediately.""",

        # 🟢 Legitimate job
        """Software Engineer - Backend.
        We are looking for a backend engineer with experience in Python and SQL.
        Responsibilities include building APIs and backend services.
        Full-time role with competitive salary.
        Apply via official careers page.""",

        # 🟡 Borderline / uncertain
        """Online Promotion Assistant.
        Flexible work from home opportunity.
        Payment based on task completion.
        More details will be shared after screening."""
    ]

    for text in samples:
        result, confidence = predict_job(text)
        print("=" * 60)
        print("INPUT TEXT:")
        print(text.strip())
        print(f"\nPREDICTION: {result}")
        print(f"CONFIDENCE: {confidence:.2f}")
