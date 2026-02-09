# 📜 User Reward History

**Endpoint:** `GET /api/admin/rewards/users/{user_id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view the complete reward history of a specific user**.

It includes all badges, point-based rewards, and recognitions assigned to the user across different activities.

This endpoint helps admins:
- audit reward distribution
- review user recognition history
- validate civic contributions
- support leaderboard or reputation systems

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | UUID | ✅ | User identifier |

---

## ✅ Example Request

```http
GET /api/admin/rewards/users/usr-341/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
