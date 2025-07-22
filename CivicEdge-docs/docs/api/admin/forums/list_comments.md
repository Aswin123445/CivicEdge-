# 💬 List Comments on Forum Post

This endpoint allows **administrators** to retrieve all comments made on a specific forum post, including details of each comment for review or moderation.

---

## 🔗 Endpoint

`GET /api/admin/forum/posts/{post_id}/comments/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Must be an admin user.

---

## 🧾 Path Parameters

| Parameter   | Type   | Required | Description                     |
|-------------|--------|----------|---------------------------------|
| `post_id`   | `uuid` | ✅       | ID of the forum post to inspect |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
[
  {
    "comment_id": "cmt123",
    "content": "This is a very valid point. Sector 7 needs attention.",
    "author": {
      "user_id": "usr456",
      "full_name": "Nandita Raj",
      "email": "nandita@example.com"
    },
    "created_at": "2025-07-15T10:45:00Z"
  },
  {
    "comment_id": "cmt456",
    "content": "I’ve noticed this too. Needs urgent fixing.",
    "author": {
      "user_id": "usr789",
      "full_name": "Shyam Verma",
      "email": "shyamv@example.com"
    },
    "created_at": "2025-07-15T11:02:00Z"
  }
]
