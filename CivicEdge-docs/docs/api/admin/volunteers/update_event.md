# ✏️ Update Volunteer Event

**Endpoint:** `PATCH /api/admin/volunteers/events/{event_id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **update details of an existing volunteer event**.

Updates are restricted to ensure fairness and data integrity — certain fields cannot be modified once volunteers have registered or after the event has started.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event_id` | UUID | ✅ | Volunteer event ID |

---

## 🧾 Request Body (Partial Update)

```json
{
  "title": "Ward 11 Mega Cleanliness Drive",
  "description": "Updated event description with extended coverage.",
  "event_date": "2026-02-03T07:00:00Z",
  "location": "Ward 11 Central Market Road"
}
