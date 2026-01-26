# ✅ Mark Volunteer Attendance

**Endpoint:** `POST /api/admin/volunteers/events/{event_id}/attendance/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **mark attendance for volunteers who participated in a specific event**.

Attendance tracking is essential for:
- participation verification
- contribution history
- eligibility for certificates or badges
- civic engagement analytics

Only volunteers registered for the event can be marked as attended or absent.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event_id` | UUID | ✅ | Volunteer event ID |

---

## 🧾 Request Body

```json
{
  "attendance": [
    {
      "user_id": "usr-341",
      "status": "attended"
    },
    {
      "user_id": "usr-529",
      "status": "absent"
    }
  ]
}
