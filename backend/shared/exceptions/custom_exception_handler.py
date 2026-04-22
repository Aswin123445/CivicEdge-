from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    # 1️ Let DRF handle known exceptions first
    response = exception_handler(exc, context)

    if response is not None:
        return Response({
            "success": False,
            "message": get_error_message(response.data),
            "errors": response.data,
            "status_code": response.status_code,
        }, status=response.status_code)

    # 2️ Handle DB errors
    if isinstance(exc, IntegrityError):
        logger.error(str(exc), exc_info=True)

        return Response({
            "success": False,
            "message": "Database constraint failed",
            "errors": {},
            "status_code": 400,
        }, status=status.HTTP_400_BAD_REQUEST)

    # 3️ Log unexpected errors
    logger.error(str(exc), exc_info=True)

    # 4️ Debug vs Production behavior
    if settings.DEBUG:
        return Response({
            "success": False,
            "message": str(exc),
            "errors": {},
            "status_code": 500,
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({
        "success": False,
        "message": "Something went wrong",
        "errors": {},
        "status_code": 500,
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_error_message(data):
    """
    Extract a clean human-readable message
    """

    # detail
    if isinstance(data, dict) and "detail" in data:
        return data["detail"]

    # non_field_errors
    if isinstance(data, dict) and "non_field_errors" in data:
        return data["non_field_errors"][0]

    # field errors
    if isinstance(data, dict):
        first_key = next(iter(data))
        first_error = data[first_key]

        if isinstance(first_error, list):
            return f"{first_key}: {first_error[0]}"

    # list
    if isinstance(data, list):
        return data[0]

    return "Validation error"