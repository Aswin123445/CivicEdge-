# 🔍 View Thread Details

**Endpoint:** `GET /api/forum/threads/{id}`  
**Auth Required:** ❌ No *(optional — for personalized data)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **complete details of a specific discussion thread**.

It includes:
- thread content
- author details
- total reactions
- total comments
- creation timestamps

If the user is authenticated, the response may also include:
- whether the user has reacted
- user-specific interaction data

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

## ✅ Example Request

```http
GET /api/forum/threads/a9c4d2e1-7b3f-4e91-baa7-998877665544
