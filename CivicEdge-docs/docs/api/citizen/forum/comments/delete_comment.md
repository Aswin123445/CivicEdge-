# 🗑️ Delete a Comment

**Endpoint:** `DELETE /api/forum/comments/{id}`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **delete their own comment** from a discussion thread.

Deletion is permitted only if:
- the comment belongs to the authenticated citizen
- the comment has not been locked or removed by moderators

In most cases, comments are **soft-deleted** to preserve discussion history and moderation audit trails.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique comment ID |

---

## ✅ Example Request

```http
DELETE /api/forum/comments/c7d8e9f1-2a3b-4c5d-9e10-112233445566
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
