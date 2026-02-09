# 🔍 View Poll Details

**Endpoint:** `GET /api/forum/polls/{id}`  
**Auth Required:** ❌ No *(login required to vote)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **complete details of a specific poll**, including its options, status, and voting configuration.

Citizens can view:
- poll question
- available options
- poll status (active/closed)
- expiry date

If authenticated, the response may also include:
- whether the citizen has already voted
- the option selected by the citizen (if allowed)

---

## 🔐 Authentication

Authentication is optional.

If provided, include the JWT access token:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique poll ID |

---

## ✅ Example Request

```http
GET /api/forum/polls/poll1234-7b89-4abc-9d10-556677889900
