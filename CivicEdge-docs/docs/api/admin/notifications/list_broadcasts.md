# 📋 List Broadcasts

**Endpoint:** `GET /api/admin/notifications/broadcasts/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view all notification broadcasts** created on the platform.

It includes:
- sent broadcasts
- scheduled broadcasts
- cancelled broadcasts

This endpoint is primarily used for monitoring, auditing, and managing admin communications.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `sent`, `scheduled`, `cancelled` |
| `target_type` | string | `all`, `role`, `zone`, `group` |
| `search` | string | Search by title |
| `created_by` | UUID | Filter by admin |
| `date_from` | date | Start date |
| `date_to` | date | End date |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/notifications/broadcasts/?status=sent
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
