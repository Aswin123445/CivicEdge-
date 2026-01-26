# 🗑️ Delete a Discussion Thread

**Endpoint:** `DELETE /api/forum/threads/{id}`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **delete their own discussion thread**.

Deletion is permitted only if:
- the thread belongs to the authenticated citizen
- the thread has not been locked or removed by moderators

In most cases, threads are **soft-deleted** to preserve discussion history and audit logs.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique thread ID |

---

## ✅ Example Request

```http
DELETE /api/forum/threads/a9c4d2e1-7b3f-4e91-baa7-998877665544
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
