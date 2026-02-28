def build_issue_timeline(issue):
    events = []

    events.append({
        "id": "evt-001",
        "type": "SYSTEM",
        "status": "Review",
        "label": "Issue submitted",
        "description": "Your complaint has been received and is currently under review. We'll update you once the next steps are decided.",
        "created_at": issue.created_at,
        "is_current": False,
    })

    # Later:
    # - admin review
    # - solver updates
    # - decisions

    events[-1]["is_current"] = True
    return events