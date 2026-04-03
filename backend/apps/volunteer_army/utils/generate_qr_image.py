import qrcode
from io import BytesIO

def generate_qr_image(data):
    qr = qrcode.make(data)

    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    buffer.seek(0)

    return buffer