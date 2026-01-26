# 📊 View User Activity

**Endpoint:** `GET /api/admin/users/{id}/activity/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to view a **summary of a user’s activity across the CivicEdge platform**.

It provides contextual insight into how a user participates in civic engagement, enabling informed moderation, behavioral review, and policy enforcement.

This endpoint aggregates activity data without exposing sensitive or private content.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique user ID |

---

## ✅ Example Request

```http
GET /api/admin/users/usr-341/activity/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
