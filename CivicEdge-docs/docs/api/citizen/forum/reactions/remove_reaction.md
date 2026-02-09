# 👎 Remove Reaction

**Endpoint:** `DELETE /api/forum/reactions/{id}`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **remove their previously added reaction** from a discussion thread or comment.

Removing a reaction:
- updates the reaction count
- allows the user to change their interaction
- helps maintain accurate engagement metrics

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique reaction ID |

---

## ✅ Example Request

```http
DELETE /api/forum/reactions/r123e456-7b89-4abc-9d10-556677889900
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
