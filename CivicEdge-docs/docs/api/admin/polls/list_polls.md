# 📋 List Polls

**Endpoint:** `GET /api/admin/polls/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view all polls created on the platform**, including active, expired, and closed polls.

It is primarily used for:
- monitoring civic participation
- managing ongoing polls
- reviewing historical voting data

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `active`, `closed`, `expired` |
| `search` | string | Search by poll title |
| `created_by` | UUID | Filter by admin |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/polls/?status=active
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
