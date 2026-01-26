# 📄 List Comments

**Endpoint:** `GET /api/forum/threads/{id}/comments`  
**Auth Required:** ❌ No *(optional — for personalized data)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves **all comments associated with a specific discussion thread**.

It allows users to:
- read community responses
- follow ongoing conversations
- view feedback and suggestions shared by other citizens

If the user is authenticated, the response may include:
- whether the user has reacted to a comment
- personalized interaction indicators

---

## 🔐 Authentication

Authentication is optional.

If provided, include the JWT access token:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique thread ID |

---

## 🔎 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number |
| `limit` | integer | Number of comments per page |
| `sort` | string | `latest`, `oldest`, `most_liked` |

---

## ✅ Example Request

```http
GET /api/forum/threads/a9c4d2e1-7b3f-4e91-baa7-998877665544/comments?page=1&limit=10
