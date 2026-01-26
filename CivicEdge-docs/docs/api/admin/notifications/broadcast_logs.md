# 📜 Broadcast Logs

**Endpoint:** `GET /api/admin/notifications/broadcast-logs/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view the complete history of all broadcast-related actions** performed on the platform.

Broadcast logs provide transparency and accountability by tracking:
- who sent notifications
- when they were sent
- who they targeted
- what actions were performed

This is a **read-only audit endpoint**.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `action` | string | `created`, `scheduled`, `sent`, `cancelled` |
| `broadcast_id` | UUID | Filter by broadcast |
| `admin_id` | UUID | Filter by admin |
| `date_from` | date | Start date |
| `date_to` | date | End date |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/notifications/broadcast-logs/?action=sent
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
