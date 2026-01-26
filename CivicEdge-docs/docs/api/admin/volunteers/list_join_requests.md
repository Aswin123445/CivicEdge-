# 📥 List Volunteer Join Requests

**Endpoint:** `GET /api/admin/volunteers/join-requests/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve **pending volunteer join requests** submitted for **Tier 2 volunteer groups**.

Tier 2 groups require manual verification due to higher responsibility, safety, or operational risk.

This endpoint enables admins to review submitted volunteer information before approving or rejecting membership.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `group_id` | UUID | Filter requests by volunteer group |
| `status` | string | `pending`, `approved`, `rejected` |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/volunteers/join-requests/?status=pending&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
