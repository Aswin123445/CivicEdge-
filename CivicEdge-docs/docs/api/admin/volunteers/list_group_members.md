# 👥 List Volunteer Group Members

**Endpoint:** `GET /api/admin/volunteers/groups/{id}/members/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve the **list of all members belonging to a specific volunteer group (army)**.

It provides visibility into membership composition, join status, and participation level, enabling admins to monitor engagement and manage volunteer capacity.

This applies to both:
- **Tier 1 groups** (instant join)
- **Tier 2 groups** (verified members only)

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Volunteer group ID |

---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by member status (`active`, `removed`) |
| `search` | string | Search by volunteer name |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/volunteers/groups/vg-102/members/?page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
