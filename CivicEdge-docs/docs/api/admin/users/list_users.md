# 📋 List Users

**Endpoint:** `GET /api/admin/users/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve a **list of all registered users** on the CivicEdge platform.

It provides visibility into user roles, account status, and basic activity indicators, helping admins monitor platform usage and enforce civic discipline.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `role` | string | Filter by role (`citizen`, `solver`, `admin`) |
| `status` | string | Filter by account status (`active`, `inactive`) |
| `blocked` | boolean | Filter blocked or unblocked users |
| `search` | string | Search by name, email, or phone |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/users/?role=citizen&status=active&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
