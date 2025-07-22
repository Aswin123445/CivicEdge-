# 📝 Create Forum Post

This endpoint allows **citizens** to create and publish a new forum post to share their thoughts, ideas, or concerns with the community.

---

## 🔗 Endpoint

`POST /api/citizen/forum/posts/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
User must be authenticated as a **citizen**.

---

## 📥 Request Body

```json
{
  "title": "Garbage collection improvement in Ward 5",
  "content": "It would be great if the garbage collection schedule is revised. The early morning pickups are often missed.",
  "tags": ["sanitation", "ward-5", "suggestion"],
  "media_urls": [
    "https://s3.bucket.com/forum/images/img123.jpg",
    "https://s3.bucket.com/forum/images/img456.jpg"
  ]
}
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
