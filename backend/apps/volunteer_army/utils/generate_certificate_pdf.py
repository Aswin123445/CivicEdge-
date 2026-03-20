from io import BytesIO

from reportlab.lib.pagesizes import landscape, A4
from reportlab.pdfgen import canvas


def generate_certificate_pdf(*, payload):
    buffer = BytesIO()

    pdf = canvas.Canvas(buffer, pagesize=landscape(A4))
    page_width, page_height = landscape(A4)

    # draw background image
    pdf.drawImage(
        "/absolute/path/to/certificate_background.png",
        0,
        0,
        width=page_width,
        height=page_height,
    )

    # participant name
    pdf.setFont("Helvetica-Bold", 24)
    pdf.drawCentredString(page_width / 2, 320, payload["participant_name"])

    # event name
    pdf.setFont("Helvetica", 16)
    pdf.drawCentredString(page_width / 2, 255, payload["event_name"])

    # issue date
    pdf.setFont("Helvetica", 10)
    pdf.drawString(90, 70, payload["issue_date"])

    # certificate id
    pdf.drawString(90, 45, payload["reference_id"])

    # TODO: draw QR image at bottom-right

    pdf.save()
    buffer.seek(0)
    return buffer.getvalue()