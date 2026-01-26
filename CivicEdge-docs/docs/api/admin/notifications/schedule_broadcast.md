# ⏰ Schedule Broadcast

**Endpoint:** `POST /api/admin/notifications/broadcasts/{broadcast_id}/schedule/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **schedule an existing broadcast** to be delivered at a future date and time.

Scheduling enables planned communication such as:
- event reminders
- civic announcements
- policy updates
- volunteer mobilization alerts

Only broadcasts that are not yet sent can be scheduled.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `broadcast_id` | UUID | ✅ | Broadcast identifier |

---

## 🧾 Request Body

```json
{
  "schedule_at": "2026-03-10T09:00:00Z"
}
