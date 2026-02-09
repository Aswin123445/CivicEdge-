# 🚨 List Reported Content

**Endpoint:** `GET /api/admin/forum/reports/`  
**Auth Required:** ✅ Yes (Admin / Moderator Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators and moderators to **view all reported forum content** submitted by citizens.

Reported content may include:
- forum threads
- forum comments

This endpoint acts as the **moderation queue**, enabling admins to review, prioritize, and take corrective actions.

---

## 🔐 Authentication

Include a valid admin or moderator token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `content_type` | string | `thread` or `comment` |
| `status` | string | `pending`, `reviewed`, `dismissed` |
| `reported_by` | UUID | Filter by reporting user |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/forum/reports/?status=pending
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
