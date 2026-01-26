# 📜 Moderation Logs

**Endpoint:** `GET /api/admin/forum/moderation-logs/`  
**Auth Required:** ✅ Yes (Admin / Moderator Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators and moderators to **view a complete history of all moderation actions** taken within the Community Forum.

Moderation logs ensure transparency, accountability, and traceability of every administrative action performed on user-generated content.

This is a **read-only audit endpoint**.

---

## 🔐 Authentication

Include a valid admin or moderator token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `action` | string | Filter by action (`delete`, `restore`, `warn`, `pin`, `unpin`, `approve`) |
| `moderator_id` | UUID | Filter by admin/moderator |
| `content_type` | string | `thread` or `comment` |
| `user_id` | UUID | Filter by affected user |
| `date_from` | date | Start date |
| `date_to` | date | End date |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/forum/moderation-logs/?action=delete
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
