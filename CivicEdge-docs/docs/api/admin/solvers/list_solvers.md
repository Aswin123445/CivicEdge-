# 📋 List Solvers

**Endpoint:** `GET /api/admin/solvers/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve a **list of all registered solvers** in the CivicEdge platform.

The solver list provides visibility into solver availability, workload, and current status, enabling informed task assignment and operational planning.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by solver status (`active`, `inactive`) |
| `blocked` | boolean | Filter blocked or unblocked solvers |
| `zone` | string | Filter by assigned zone |
| `skill` | string | Filter by specialization |
| `availability` | string | Filter by availability (`available`, `busy`) |
| `search` | string | Search by name or email |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/solvers/?status=active&zone=Ward%2011&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
