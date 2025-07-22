# 👍 Like a Forum Post

This endpoint allows **citizens** to like or react positively to a public forum post. Liking a post signals support or agreement and increases its visibility.

---

## 🔗 Endpoint

`POST /api/citizen/forum/posts/{post_id}/like/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
User must be authenticated as a **citizen**.

---

## 🧾 Path Parameters

| Parameter   | Type   | Required | Description                    |
|-------------|--------|----------|--------------------------------|
| `post_id`   | `uuid` | ✅       | The ID of the post to like     |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "message": "Post liked successfully.",
  "post_id": "a7e13cc1-f9ad-4c7e-a0cd-11f3cc65ad52",
  "liked_by": "f65e2aab-9b1e-41a2-9949-76a289fd6b33",
  "like_count": 24
}
