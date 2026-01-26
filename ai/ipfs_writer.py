import ipfshttpclient

def upload_text_to_ipfs(text: str) -> str | None:
    """
    Uploads text to IPFS and returns CID.
    Best-effort: returns None if anything fails.
    """
    try:
        with ipfshttpclient.connect("/dns/ipfs.infura.io/tcp/5001/https") as client:
            res = client.add_str(text)
            return res
    except Exception as e:
        print(f"[IPFS] upload failed (ignored): {e}")
        return None
