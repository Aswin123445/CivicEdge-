# 📚 View Forum Posts

This endpoint allows **citizens** to view all public forum posts submitted by other users in the community. Posts are listed in reverse chronological order (newest first) by default.

---

## 🔗 Endpoint

`GET /api/citizen/forum/posts/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
User must be authenticated as a **citizen**.

---

## 📥 Query Parameters (Optional)

| Parameter     | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| `tag`         | `string` | Filter posts by tag (e.g., `sanitation`)         |
| `author`      | `uuid`   | Filter posts by author ID                        |
| `search`      | `string` | Search by title or content                       |
| `page`        | `int`    | Page number for pagination (default = 1)         |
| `page_size`   | `int`    | Number of posts per page (default = 10)          |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "total": 87,
  "page": 1,
  "page_size": 10,
  "posts": [
    {
      "post_id": "a7e13cc1-f9ad-4c7e-a0cd-11f3cc65ad52",
      "title": "Garbage collection improvement in Ward 5",
      "content": "It would be great if the garbage collection schedule is revised...",
      "author": {
        "user_id": "f65e2aab-9b1e-41a2-9949-76a289fd6b33",
        "name": "Anjali Thomas"
      },
      "tags": ["sanitation", "ward-5", "suggestion"],
      "media_urls": [
        "https://s3.bucket.com/forum/images/img123.jpg"
      ],
      "created_at": "2025-07-15T12:30:00Z"
    }
  ]
}
