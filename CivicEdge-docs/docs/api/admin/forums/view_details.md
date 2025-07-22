# 🔍 View Forum Post Details

This endpoint allows **administrators** to view full details of a specific forum post made by a citizen, including comments and engagement metrics.

---

## 🔗 Endpoint

`GET /api/admin/forum/posts/{post_id}/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Must be an admin user.

---

## 🧾 Path Parameters

| Parameter   | Type   | Required | Description                    |
|-------------|--------|----------|--------------------------------|
| `post_id`   | `uuid` | ✅       | ID of the forum post to view   |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "post_id": "a3f1c8e2-9b2d-4e87-9a2f-2c3e1eaf45cc",
  "title": "More Street Lights Needed in Sector 7",
  "content": "Our area has frequent power outages and is very dark at night...",
  "author": {
    "user_id": "c1f2a8de-45bf-4b99-a2d5-b845e6e5b45a",
    "full_name": "Ravi Kumar",
    "email": "ravi.k@example.com"
  },
  "status": "published",
  "created_at": "2025-07-15T12:30:00Z",
  "updated_at": "2025-07-15T13:00:00Z",
  "like_count": 12,
  "comment_count": 4,
  "comments": [
    {
      "comment_id": "bcd321",
      "content": "Totally agree. The road is pitch dark!",
      "author_name": "Anita Sharma",
      "created_at": "2025-07-15T12:45:00Z"
    },
    {
      "comment_id": "cde432",
      "content": "We’ve raised this issue multiple times.",
      "author_name": "Farhan Ali",
      "created_at": "2025-07-15T12:50:00Z"
    }
  ]
}
