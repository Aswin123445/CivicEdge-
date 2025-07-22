# 📝 List My Forum Posts

This endpoint allows **citizens** to view all forum posts they have created. It provides a personal view of their contributions to the community discussions.

---

## 🔗 Endpoint

`GET /api/citizen/forum/my-posts/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
User must be authenticated as a **citizen**.

---

## 📥 Query Parameters (Optional)

| Parameter     | Type     | Description                           |
|---------------|----------|---------------------------------------|
| `page`        | `int`    | For pagination – the page number      |
| `page_size`   | `int`    | Number of posts per page              |
| `sort_by`     | `string` | `created_at`, `likes`, etc.           |
| `order`       | `string` | `asc` or `desc`                       |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
[
  {
    "post_id": "92d4a9bc-b3e3-4d8a-9b7a-5f6a77aa3a11",
    "title": "Better Waste Management",
    "content": "I think we need more public bins in our area...",
    "created_at": "2025-07-13T08:45:00Z",
    "like_count": 12,
    "comment_count": 4,
    "status": "active"
  },
  {
    "post_id": "e5c973d7-c9bb-4a77-98a1-fcf63f0c83b7",
    "title": "Fix Street Light Near Temple",
    "content": "The light near XYZ temple has been broken for weeks...",
    "created_at": "2025-07-12T16:10:00Z",
    "like_count": 8,
    "comment_count": 2,
    "status": "active"
  }
]
