# 📋 List Rewards

**Endpoint:** `GET /api/admin/rewards/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve a **list of all available rewards** created in the system.

Rewards may include:
- badges
- point-based rewards
- special recognition labels

These rewards can later be assigned to citizens, volunteers, or solvers.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Filter by reward type (`badge`, `points`) |
| `search` | string | Search reward by name |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/rewards/?type=badge
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
