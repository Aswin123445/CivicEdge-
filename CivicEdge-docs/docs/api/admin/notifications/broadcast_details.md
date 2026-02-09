# 📄 Broadcast Details

**Endpoint:** `GET /api/admin/notifications/broadcasts/{broadcast_id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view complete details of a specific broadcast notification**.

It provides full visibility into:
- message content
- target audience
- delivery status
- scheduling information
- audit metadata

This endpoint is primarily used for verification, review, and transparency.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `broadcast_id` | UUID | ✅ | Broadcast identifier |

---

## ✅ Example Request

```http
GET /api/admin/notifications/broadcasts/bc-1021/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
