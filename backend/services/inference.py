from ai.predict import predict_job


def run_inference(title: str, description: str, requirements: str):
    """
    Wraps the existing ML + blockchain pipeline.
    Returns:
        label (str): SCAM | LEGIT | UNCERTAIN
        confidence (float)
    """
    combined_text = f"{title} {description} {requirements}"

    label, confidence, tx_hash = predict_job(combined_text)
    
    return label, confidence, tx_hash

