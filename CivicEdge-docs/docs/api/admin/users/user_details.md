# 🔍 User Details

**Endpoint:** `GET /api/admin/users/{id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve the **complete profile and participation summary of a specific user**.

It provides a unified view of the user’s identity, role, account status, and involvement across the CivicEdge platform.

This endpoint is commonly used before taking moderation or access-control actions.

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
GET /api/admin/users/usr-341/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
