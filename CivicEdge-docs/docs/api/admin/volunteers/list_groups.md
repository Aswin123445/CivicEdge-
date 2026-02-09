# 📋 List Volunteer Groups

**Endpoint:** `GET /api/admin/volunteers/groups/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve a **list of all volunteer groups (armies)** created within the CivicEdge platform.

It provides visibility into group tier, participation volume, and operational status, helping admins manage civic initiatives effectively.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `tier` | string | Filter by tier (`tier1`, `tier2`) |
| `status` | string | Filter by group status (`active`, `inactive`) |
| `search` | string | Search by group name |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/volunteers/groups/?tier=tier1&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
