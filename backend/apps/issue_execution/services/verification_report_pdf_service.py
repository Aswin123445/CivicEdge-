import requests
from io import BytesIO
from datetime import datetime

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
    PageBreak,
)

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors


# ---------------------------------------------------
# Helper Functions
# ---------------------------------------------------


def format_time(value):
    if not value:
        return "-"
    return value.strftime("%d %b %Y, %I:%M %p")


def get_remote_image(url, width=2.6 * inch):
    """Safely load remote images"""
    try:
        response = requests.get(url, timeout=8)
        response.raise_for_status()

        img_data = BytesIO(response.content)
        img = Image(img_data)

        aspect = img.imageHeight / float(img.imageWidth)
        img.drawWidth = width
        img.drawHeight = width * aspect

        return img

    except Exception:
        return Paragraph("<font color='grey'>Image unavailable</font>")


def add_footer(canvas, doc):
    """Footer for each page"""
    canvas.saveState()

    canvas.setFont("Helvetica-Oblique", 8)
    canvas.setStrokeColor(colors.lightgrey)

    canvas.line(40, 50, A4[0] - 40, 50)

    canvas.drawString(40, 35, "CivicEdge Verification System | Official Use Only")

    canvas.drawRightString(A4[0] - 40, 35, f"Page {doc.page}")

    canvas.restoreState()


# ---------------------------------------------------
# Main PDF Generator
# ---------------------------------------------------


def generate_verification_report_pdf(report):

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=50,
        leftMargin=50,
        topMargin=60,
        bottomMargin=70,
    )

    styles = getSampleStyleSheet()

    # ---------------------------------------------------
    # Styles
    # ---------------------------------------------------

    title_style = ParagraphStyle(
        "TitleStyle",
        parent=styles["Heading1"],
        fontSize=20,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=6,
    )

    section_style = ParagraphStyle(
        "SectionStyle",
        parent=styles["Heading2"],
        textColor=colors.white,
        backColor=colors.HexColor("#1e293b"),
        borderPadding=6,
        spaceBefore=16,
        spaceAfter=12,
    )

    label_style = ParagraphStyle(
        "LabelStyle",
        fontSize=9,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#475569"),
    )

    cell_text = ParagraphStyle(
        "CellText", parent=styles["BodyText"], fontSize=10, leading=13
    )

    elements = []

    # ---------------------------------------------------
    # Header
    # ---------------------------------------------------

    header = Table(
        [
            [
                Paragraph(
                    "<b>CIVICEDGE</b><br/><font size=9>Urban Civic Monitoring Division</font>",
                    title_style,
                ),
                Paragraph(
                    f"<b>Report ID:</b> {report.reference_id}<br/>"
                    f"<b>Generated:</b> {datetime.now().strftime('%d %b %Y')}<br/>",
                    cell_text,
                ),
            ]
        ],
        colWidths=[3.7 * inch, 2.3 * inch],
    )

    elements.append(header)
    elements.append(Spacer(1, 12))

    # ---------------------------------------------------
    # I. Executive Summary
    # ---------------------------------------------------

    elements.append(Paragraph("I. EXECUTIVE SUMMARY", section_style))

    summary_table = Table(
        [
            [
                Paragraph("Submission Date", label_style),
                Paragraph("Submitted By", label_style),
                Paragraph("Severity Level", label_style),
            ],
            [
                format_time(report.submitted_at),
                report.submitted_by.email,
                report.severity_level.upper(),
            ],
        ],
        colWidths=[2 * inch, 2.5 * inch, 1.5 * inch],
    )

    summary_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#f1f5f9")),
                ("PADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    elements.append(summary_table)

    # ---------------------------------------------------
    # II. Issue Context
    # ---------------------------------------------------

    issue = report.solver_task.issue

    elements.append(Paragraph("II. INCIDENT DETAILS", section_style))

    issue_table = Table(
        [
            ["Issue Reference", issue.reference_id],
            ["Title", Paragraph(issue.title, cell_text)],
            ["Description", Paragraph(issue.description, cell_text)],
            ["Category", issue.category.name],
            ["Reported By", issue.reporter.email],
            ["Issue Status", issue.status],
            ["Created At", format_time(issue.created_at)],
        ],
        colWidths=[1.7 * inch, 4.3 * inch],
    )

    issue_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.3, colors.lightgrey),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )

    elements.append(issue_table)

    # ---------------------------------------------------
    # III. Field Verification
    # ---------------------------------------------------

    elements.append(Paragraph("III. FIELD OBSERVATION", section_style))

    field_table = Table(
        [
            ["Issue Present", "YES" if report.is_issue_present else "NO"],
            ["Affected Area", Paragraph(report.affected_area_description, cell_text)],
            ["Public Impact", Paragraph(report.public_impact_summary, cell_text)],
            ["Local Feedback", Paragraph(report.local_feedback_summary, cell_text)],
        ],
        colWidths=[1.7 * inch, 4.3 * inch],
    )

    field_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.3, colors.lightgrey),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )

    elements.append(field_table)

    # ---------------------------------------------------
    # IV. Resource Estimation
    # ---------------------------------------------------

    elements.append(Paragraph("IV. RESOURCE ESTIMATION", section_style))

    estimation_table = Table(
        [
            ["Estimated Budget", f"₹ {report.estimated_budget}"],
            ["Estimated Duration", f"{report.estimated_duration_days} Days"],
            ["Execution Risks", Paragraph(report.execution_risks, cell_text)],
            ["Site Constraints", Paragraph(report.site_constraints, cell_text)],
        ],
        colWidths=[1.7 * inch, 4.3 * inch],
    )

    estimation_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.3, colors.lightgrey),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )

    elements.append(estimation_table)

    # ---------------------------------------------------
    # V. Photographic Evidence
    # ---------------------------------------------------

    evidences = report.media.all()

    if evidences.exists():

        elements.append(PageBreak())
        elements.append(Paragraph("V. PHOTOGRAPHIC EVIDENCE", section_style))

        images = []

        for ev in evidences:
            img = get_remote_image(ev.secure_url)
            images.append(img)

        grid = [images[i : i + 2] for i in range(0, len(images), 2)]

        evidence_table = Table(grid, colWidths=[3 * inch, 3 * inch])

        evidence_table.setStyle(
            TableStyle(
                [
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
                ]
            )
        )

        elements.append(evidence_table)

    # ---------------------------------------------------
    # VI. Verification Officer
    # ---------------------------------------------------

    elements.append(Spacer(1, 30))

    elements.append(Paragraph("VI. OFFICER CERTIFICATION", section_style))

    cert_table = Table(
        [
            ["Verified By", report.submitted_by.email],
            ["Designation", "Field Verification Officer"],
            ["Signature", "____________________________"],
            ["Verification Date", format_time(report.submitted_at)],
        ],
        colWidths=[2 * inch, 4 * inch],
    )

    cert_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.3, colors.lightgrey),
            ]
        )
    )

    elements.append(cert_table)

    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(
            "This document is automatically generated by the CivicEdge Verification System.",
            styles["Italic"],
        )
    )

    # Build PDF
    doc.build(elements, onFirstPage=add_footer, onLaterPages=add_footer)

    buffer.seek(0)

    return buffer
