# 💬 List Comments on a Forum Post

This endpoint allows **citizens** to fetch all comments associated with a specific forum post. Useful for viewing public discussion and engagement on a topic.

---

## 🔗 Endpoint

`GET /api/citizen/forum/posts/{post_id}/comments/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Must be an authenticated **citizen**.

---

## 🧾 Path Parameters

| Parameter   | Type   | Required | Description                         |
|-------------|--------|----------|-------------------------------------|
| `post_id`   | `uuid` | ✅        | ID of the forum post to fetch comments for |

---

## 📥 Query Parameters (Optional)

| Parameter     | Type     | Description                           |
|---------------|----------|---------------------------------------|
| `page`        | `int`    | Page number for pagination            |
| `page_size`   | `int`    | Number of comments per page           |
| `sort_by`     | `string` | `created_at` (default), `likes`, etc. |
| `order`       | `string` | `asc` or `desc`                       |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
[
  {
    "comment_id": "c1e0a87a-5c7e-43f5-9d4f-f58d08f76d55",
    "user": {
      "user_id": "u234...",
      "name": "Amina Hiba"
    },
    "content": "This is a great suggestion! Totally agree.",
    "created_at": "2025-07-14T09:15:00Z",
    "like_count": 3
  },
  {
    "comment_id": "d48a1f3b-09bd-47f0-9332-30ea6bb927bc",
    "user": {
      "user_id": "u777...",
      "name": "Rabeeh Sayyed"
    },
    "content": "We should also report this to the ward office.",
    "created_at": "2025-07-14T10:02:00Z",
    "like_count": 1
  }
]
