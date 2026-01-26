# 💬 Add a Comment

**Endpoint:** `POST /api/forum/threads/{id}/comments`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **add a comment to an existing discussion thread**.

Comments enable users to:
- share opinions
- respond to ideas
- contribute to healthy civic discussions

All comments are subject to community guidelines and moderation rules.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique thread ID |

---

## 🧾 Request Body

```json
{
  "content": "This is a very good idea. Awareness sessions could help residents understand waste segregation."
}
