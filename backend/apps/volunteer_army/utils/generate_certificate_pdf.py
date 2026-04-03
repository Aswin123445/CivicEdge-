from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
import os
from django.conf import settings

from apps.volunteer_army.utils.generate_qr_image import generate_qr_image


# -------------------------
# CONFIG (centralized layout)
# -------------------------
PAGE_WIDTH = 928
PAGE_HEIGHT = 743

LAYOUT = {
    "center_x": PAGE_WIDTH / 2,
    "base_y": PAGE_HEIGHT - 460,

    # Text offsets
    "name_offset": 40,
    "event_offset": -40,

    # Footer
    "date_x": 170,
    "date_y": 119,
    "id_y": 60,

    # QR
    "qr_x": 710,
    "qr_y": 90,
    "qr_size": 115,
    "qr_padding": 6,
}


# -------------------------
# HELPERS
# -------------------------

def get_background_path():
    return os.path.join(
        settings.BASE_DIR,
        "shared",
        "static",
        "certificates",
        "certificate_background.webp",
    )


def fit_text(pdf, text, font_name, max_width, initial_size):
    """Auto shrink text to fit width"""
    font_size = initial_size

    while pdf.stringWidth(text, font_name, font_size) > max_width:
        font_size -= 1

    return font_size


# -------------------------
# DRAW FUNCTIONS
# -------------------------

def draw_background(pdf):
    pdf.drawImage(
        get_background_path(),
        0,
        0,
        width=PAGE_WIDTH,
        height=PAGE_HEIGHT,
    )


def draw_participant_name(pdf, payload):
    name = payload["participant_name"]

    font_size = fit_text(pdf, name, "Times-Bold", 700, 34)

    pdf.setFont("Times-Bold", font_size)
    pdf.setFillColor(colors.black)

    pdf.drawCentredString(
        LAYOUT["center_x"],
        LAYOUT["base_y"] + LAYOUT["name_offset"] -40,
        name
    )


def draw_event_name(pdf, payload):
    event_name = payload["event_name"]

    pdf.setFont("Times-Roman", 20)
    pdf.setFillColor(colors.black)

    pdf.drawCentredString(
        LAYOUT["center_x"],
        LAYOUT["base_y"] + LAYOUT["event_offset"] -15,
        f"For Parcipating in {event_name}"
    )


def draw_footer(pdf, payload):
    pdf.setFont("Times-Roman", 10)

    pdf.drawString(
        LAYOUT["date_x"],
        LAYOUT["date_y"],
        payload["issue_date"]
    )

    pdf.drawString(
        LAYOUT["date_x"] - 10,
        LAYOUT["id_y"],
        payload["reference_id"]
    )


def draw_qr(pdf, payload):
    qr_buffer = generate_qr_image(payload["verification_url"])
    qr_image = ImageReader(qr_buffer)

    x = LAYOUT["qr_x"]
    y = LAYOUT["qr_y"]
    size = LAYOUT["qr_size"]
    pad = LAYOUT["qr_padding"]

    # White overlay (clean override)
    pdf.setFillColor(colors.white)
    pdf.rect(
        x - pad,
        y - pad,
        size + 2 * pad,
        size + 2 * pad,
        fill=1,
        stroke=0,
    )

    # QR
    pdf.drawImage(
        qr_image,
        x,
        y,
        width=size,
        height=size,
        mask="auto",
    )

    # Border
    pdf.setStrokeColor(colors.black)
    pdf.setLineWidth(1)
    pdf.rect(
        x - pad,
        y - pad,
        size + 2 * pad,
        size + 2 * pad,
        stroke=1,
    )


# -------------------------
# MAIN FUNCTION
# -------------------------

def generate_certificate_pdf(*, payload):
    buffer = BytesIO()

    pdf = canvas.Canvas(buffer, pagesize=(PAGE_WIDTH, PAGE_HEIGHT))

    # Draw layers
    draw_background(pdf)
    draw_participant_name(pdf, payload)
    draw_event_name(pdf, payload)
    draw_footer(pdf, payload)
    draw_qr(pdf, payload)

    pdf.save()
    buffer.seek(0)

    return buffer.getvalue()