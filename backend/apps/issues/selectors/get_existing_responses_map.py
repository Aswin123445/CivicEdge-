# selectors/behavioral_responses.py
def get_existing_responses_map(*, issue):
    return {
        r.prompt_id: r
        for r in issue.behavioral_responses.all()
    }
