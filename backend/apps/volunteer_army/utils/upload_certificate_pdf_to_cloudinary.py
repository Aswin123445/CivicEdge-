import cloudinary.uploader


def upload_certificate_pdf_to_cloudinary(*, pdf_bytes, reference_id):
    return cloudinary.uploader.upload(
        pdf_bytes,
        resource_type="raw",
        folder="civicedge/volunteer_certificates",
        public_id=reference_id,
        format="pdf",
    )