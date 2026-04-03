import cloudinary.uploader
from io import BytesIO
import logging

logger = logging.getLogger(__name__)


class CertificateService:

    @staticmethod
    def upload_certificate(pdf_bytes, reference_id):
        try:
            buffer = BytesIO(pdf_bytes)

            result = cloudinary.uploader.upload(
                buffer,
                folder="certificates/events",
                public_id=f"{reference_id}.pdf",
                overwrite=True,
                resource_type="raw",
            )

            return result["secure_url"]

        except Exception as e:
            logger.error(f"Cloudinary upload failed for {reference_id}: {str(e)}")
            raise