from datetime import date, timedelta
from django.utils import timezone
from rest_framework.exceptions import ValidationError


RANGE_MAP = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "1y": 365,
}


def resolve_date_range(query_params: dict) -> tuple[date, date]:
    """
    Resolves (current_start, current_end) from query params.

    Priority:
        1. date_from + date_to  (custom range)
        2. date_from only       (from that date to today)
        3. range=7d / 30d / 90d / 1y
        4. Default: last 30 days
    """
    today = timezone.now().date()

    date_from = query_params.get("date_from")
    date_to = query_params.get("date_to")
    range_key = query_params.get("range", "30d")

    # --- Custom range ---
    if date_from:
        try:
            start = date.fromisoformat(date_from)
        except ValueError:
            raise ValidationError({"date_from": "Invalid date format. Use YYYY-MM-DD."})

        if date_to:
            try:
                end = date.fromisoformat(date_to)
            except ValueError:
                raise ValidationError({"date_to": "Invalid date format. Use YYYY-MM-DD."})
        else:
            end = today

        if start > end:
            raise ValidationError({"date_from": "date_from must be before date_to."})

        return start, end

    # --- Preset range ---
    if range_key not in RANGE_MAP:
        raise ValidationError(
            {"range": f"Invalid range '{range_key}'. Choices: {', '.join(RANGE_MAP.keys())}."}
        )

    days = RANGE_MAP[range_key]
    return today - timedelta(days=days), today


def resolve_previous_range(current_start: date, current_end: date) -> tuple[date, date]:
    """
    Returns a previous period of the same length for % change calculations.
    e.g. current = Apr 1–Apr 30 → previous = Mar 2–Mar 31
    """
    span = (current_end - current_start).days or 1
    previous_end = current_start - timedelta(days=1)
    previous_start = previous_end - timedelta(days=span)
    return previous_start, previous_end