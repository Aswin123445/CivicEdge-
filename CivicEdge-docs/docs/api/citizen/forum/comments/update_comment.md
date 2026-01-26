# ✏️ Update a Comment

**Endpoint:** `PATCH /api/forum/comments/{id}`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **update their previously posted comment** on a discussion thread.

Updates are permitted only if:
- the comment belongs to the authenticated citizen
- the comment has not been locked or removed by moderators

Citizens can modify the comment content to correct mistakes or clarify their message.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique comment ID |

---

## 🧾 Request Body (Partial)

Send only the fields you want to update:

```json
{
  "content": "Updated comment: awareness sessions with posters could be more effective."
}
