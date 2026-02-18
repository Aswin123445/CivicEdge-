from django.db.models import Max

def generate_reference_id(
    model,
    field_name="reference_id",
    prefix="REF",
    padding=6,
):
    last = model.objects.aggregate(
        max_id=Max(field_name)
    )["max_id"]

    if last:
        num = int(last.split("-")[-1]) + 1
    else:
        num = 1

    return f"{prefix}-{num:0{padding}d}"
