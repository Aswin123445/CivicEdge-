# 📄 View My Reports

**Endpoint:** `GET /api/forum/reports/my`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **view all forum content reports** they have submitted.

It helps users:
- track the status of their reports
- understand moderation outcomes
- maintain transparency in community governance

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔎 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number |
| `limit` | integer | Number of reports per page |
| `status` | string | `pending`, `reviewed`, `action_taken` |

---

## ✅ Example Request

```http
GET /api/forum/reports/my?page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
