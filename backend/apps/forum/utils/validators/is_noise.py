import re
def is_noise(text: str) -> bool:
    text = text.strip()

    if not text:
        return True

    if not re.search(r"[a-zA-Z0-9]", text):
        return True

    if len(set(text)) == 1:
        return True

    return False