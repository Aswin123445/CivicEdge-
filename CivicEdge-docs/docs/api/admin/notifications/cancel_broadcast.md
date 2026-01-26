# ❌ Cancel Scheduled Broadcast

**Endpoint:** `POST /api/admin/notifications/broadcasts/{broadcast_id}/cancel/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **cancel a previously scheduled broadcast** before it is delivered.

Once cancelled:
- the broadcast will not be sent
- users will not receive the notification
- the record remains for audit and history

Only scheduled broadcasts can be cancelled.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `broadcast_id` | UUID | ✅ | Broadcast identifier |

---

## 🔄 Cancellation Rules

- Only broadcasts with status `scheduled` can be cancelled
- Sent broadcasts cannot be cancelled
- Cancelled broadcasts cannot be reactivated
- Cancellation reason is recommended for audit

---

## 🧾 Request Body (Optional)

```json
{
  "reason": "Event postponed due to weather conditions."
}
