# 📣 Create Broadcast

**Endpoint:** `POST /api/admin/notifications/broadcasts/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **create and send a broadcast notification** to a targeted group of users.

Broadcasts are used to communicate important civic information such as:
- emergency alerts
- event announcements
- volunteer calls
- poll reminders
- system updates

Broadcasts can be sent **immediately** or **scheduled for future delivery**.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "title": "Road Maintenance Alert",
  "message": "Road repair work will take place in Ward 11 tomorrow from 9 AM to 5 PM.",
  "target_type": "zone",
  "target_value": "Ward 11",
  "schedule_at": "2026-03-05T08:00:00Z"
}
