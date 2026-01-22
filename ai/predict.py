import pickle
from preprocess import clean_text

CONFIDENCE_THRESHOLD = 0.70

with open("model.pkl", "rb") as f:
    model, vectorizer = pickle.load(f)

def predict_scam(text: str):
    clean = clean_text(text)
    vec = vectorizer.transform([clean])

    probs = model.predict_proba(vec)[0]
    prediction = probs.argmax()
    confidence = probs[prediction]

    if confidence < CONFIDENCE_THRESHOLD:
        return "UNCERTAIN", confidence

    return "SCAM" if prediction == 1 else "LEGIT", confidence


if __name__ == "__main__":
    samples = [
        "Pay registration fee to get job immediately",
        "Hiring software engineer with Python experience"
    ]

    for text in samples:
        result, conf = predict_scam(text)
        print(f"Text: {text}")
        print(f"Prediction: {result}, Confidence: {conf:.2f}\n")
