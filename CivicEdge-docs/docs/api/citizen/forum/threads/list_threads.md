# 📄 List Discussion Threads

**Endpoint:** `GET /api/forum/threads/`  
**Auth Required:** ❌ No *(optional — depends on platform settings)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves a **list of discussion threads** available in the Community Forum.

It allows citizens to:
- browse public discussions
- explore civic ideas
- view active community topics

Threads can be filtered, searched, or paginated for better user experience.

---

## 🔐 Authentication

Authentication is optional for viewing threads.

If authenticated, personalized data such as:
- user reactions
- participation status

may be included in the response.

---

## 🔎 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter threads by category |
| `search` | string | Search threads by title or content |
| `page` | integer | Page number for pagination |
| `limit` | integer | Number of threads per page |
| `sort` | string | `latest`, `popular`, `most_commented` |

---

## ✅ Example Request

```http
GET /api/forum/threads/?category=Sanitation&page=1&limit=10
