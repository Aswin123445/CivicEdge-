# 📄 List All Forum Posts

This endpoint allows **administrators** to retrieve a list of all forum posts made by citizens. Admins can use this to monitor community discussions, detect potentially harmful content, and assess active topics.

---

## 🔗 Endpoint

`GET /api/admin/forum/posts/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Must be an admin user.

---

## 🧾 Query Parameters (Optional)

| Parameter     | Type     | Description                                    |
|---------------|----------|------------------------------------------------|
| `status`      | string   | Filter posts by status (`published`, `flagged`, `deleted`) |
| `author_id`   | uuid     | Filter posts by specific user ID              |
| `search`      | string   | Keyword search in title or content            |
| `page`        | integer  | Pagination: page number                       |
| `limit`       | integer  | Pagination: number of items per page          |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "total": 2,
  "page": 1,
  "limit": 10,
  "results": [
    {
      "post_id": "a3f1c8e2-9b2d-4e87-9a2f-2c3e1eaf45cc",
      "title": "More Street Lights Needed in Sector 7",
      "content": "Our area has frequent power outages and is very dark at night...",
      "author": {
        "user_id": "c1f2a8de-45bf-4b99-a2d5-b845e6e5b45a",
        "full_name": "Ravi Kumar"
      },
      "status": "published",
      "created_at": "2025-07-15T12:30:00Z",
      "comment_count": 4,
      "like_count": 12
    },
    {
      "post_id": "b41dca32-ec1d-4412-ae98-883e3725c891",
      "title": "Need a Community Garden",
      "content": "Unused land near the block could be turned into a public green space...",
      "author": {
        "user_id": "d843f01e-a8c2-43bd-97a1-44139fb2e8a0",
        "full_name": "Fatima Noor"
      },
      "status": "flagged",
      "created_at": "2025-07-14T09:15:00Z",
      "comment_count": 7,
      "like_count": 20
    }
  ]
}
