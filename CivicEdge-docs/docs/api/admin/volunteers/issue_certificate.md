# 🏅 Issue Volunteer Certificate

**Endpoint:** `POST /api/admin/volunteers/events/{event_id}/certificates/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **issue participation certificates to volunteers** who successfully attended a volunteer event.

Certificates serve as official recognition of civic contribution and are recorded permanently in the user’s participation history.

Only volunteers marked as **attended** are eligible for certificate issuance.

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
  "user_ids": [
    "usr-341",
    "usr-529"
  ]
}
