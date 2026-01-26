# ❌ Cancel Volunteer Event

**Endpoint:** `POST /api/admin/volunteers/events/{event_id}/cancel/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **cancel a scheduled volunteer event**.

Event cancellation may be required due to:
- weather conditions
- safety concerns
- insufficient participation
- administrative or logistical reasons

Once cancelled:
- the event becomes inactive
- volunteers are notified automatically
- attendance and certificate issuance are disabled

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event_id` | UUID | ✅ | Volunteer event ID |

---

## 🧾 Request Body (Optional)

```json
{
  "reason": "Heavy rainfall expected. Event postponed for safety."
}
