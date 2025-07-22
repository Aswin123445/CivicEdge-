# 💬 Comment on a Forum Post

This endpoint allows **citizens** to comment on an existing public forum post, fostering discussion and engagement in the community.

---

## 🔗 Endpoint

`POST /api/citizen/forum/posts/{post_id}/comments/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
User must be authenticated as a **citizen**.

---

## 🧾 Path Parameters

| Parameter   | Type   | Required | Description                    |
|-------------|--------|----------|--------------------------------|
| `post_id`   | `uuid` | ✅       | The ID of the forum post to comment on |

---

## 📥 Request Body (JSON)

```json
{
  "content": "I agree with your idea. This would benefit our area a lot!"
}

{
  "comment_id": "b84f12ea-8e5c-4a59-999b-3df0e2b6d447",
  "post_id": "a7e13cc1-f9ad-4c7e-a0cd-11f3cc65ad52",
  "user": {
    "user_id": "f65e2aab-9b1e-41a2-9949-76a289fd6b33",
    "name": "Anjali Thomas"
  },
  "content": "I agree with your idea. This would benefit our area a lot!",
  "created_at": "2025-07-15T15:12:00Z"
}
