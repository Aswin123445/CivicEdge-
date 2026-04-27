

from apps.analytics.selectors.poll_analytics.poll_anaytics_selector import get_participation_trend, get_poll_count, get_top_polls, get_total_user_count, get_unique_voter_count, get_vote_count


from datetime import date

def _safe_change_percent(current: float, previous: float) -> float:
    """Returns percentage change rounded to 1 decimal place. Returns 0.0 if no previous data."""
    if not previous:
        return 0.0
    return round(((current - previous) / previous) * 100, 1)


def get_analytics_data(
    *,
    current_start: date,
    current_end: date,
    previous_start: date,
    previous_end: date,
    top_polls_limit: int = 5,
) -> dict:
    """
    Assembles the full analytics payload for the given date windows.
    All date resolution happens in the view layer via date_range helpers.
    """
    # ------------------------------------------------------------------ #
    # KPI raw values
    # ------------------------------------------------------------------ #
    total_polls_current = get_poll_count(start_date=current_start, end_date=current_end)
    total_polls_previous = get_poll_count(start_date=previous_start, end_date=previous_end)
 
    total_votes_current = get_vote_count(start_date=current_start, end_date=current_end)
    total_votes_previous = get_vote_count(start_date=previous_start, end_date=previous_end)
 
    unique_voters_current = get_unique_voter_count(start_date=current_start, end_date=current_end)
    unique_voters_previous = get_unique_voter_count(start_date=previous_start, end_date=previous_end)
 
    total_users = get_total_user_count() or 1
 
    participation_rate_current = round((unique_voters_current / total_users) * 100, 1)
    participation_rate_previous = round((unique_voters_previous / total_users) * 100, 1)
 
    avg_votes_current = (
        round(total_votes_current / total_polls_current, 1) if total_polls_current else 0.0
    )
    avg_votes_previous = (
        round(total_votes_previous / total_polls_previous, 1) if total_polls_previous else 0.0
    )
 
    # ------------------------------------------------------------------ #
    # KPIs
    # ------------------------------------------------------------------ #
    kpis = {
        "total_polls": {
            "value": total_polls_current,
            "change_percent": _safe_change_percent(total_polls_current, total_polls_previous),
        },
        "total_votes": {
            "value": total_votes_current,
            "change_percent": _safe_change_percent(total_votes_current, total_votes_previous),
        },
        "participation_rate": {
            "value": participation_rate_current,
            "change_percent": _safe_change_percent(
                participation_rate_current, participation_rate_previous
            ),
        },
        "avg_votes_per_poll": {
            "value": avg_votes_current,
            "change_percent": _safe_change_percent(avg_votes_current, avg_votes_previous),
        },
    }
 
    # ------------------------------------------------------------------ #
    # Trend — daily buckets across current window
    # ------------------------------------------------------------------ #
    participation_trend = get_participation_trend(
        start_date=current_start,
        end_date=current_end,
    )
 
    # ------------------------------------------------------------------ #
    # Top polls — scoped to current window
    # ------------------------------------------------------------------ #
    raw_top_polls = get_top_polls(
        limit=top_polls_limit,
        start_date=current_start,
        end_date=current_end,
    )
    top_polls = [
        {
            "id": row["reference_id"],
            "title": row["question"],
            "votes": row["votes_ano"],
            "unique_participants": row["unique_participants"],
            "status": row["status"].capitalize(),
        }
        for row in raw_top_polls
    ]
 
    return {
        "kpis": kpis,
        "participation_trend": participation_trend,
        "top_polls": top_polls,
    }
