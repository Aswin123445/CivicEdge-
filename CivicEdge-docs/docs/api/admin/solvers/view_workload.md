# 📊 View Solver Workload

**Endpoint:** `GET /api/admin/solvers/{id}/workload/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view the current workload of a solver**.

Workload data helps admins:
- avoid over-assigning complaints
- balance tasks across solvers
- identify idle or overloaded field workers

This endpoint is typically used before assigning new complaints.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique solver ID |

---

## ✅ Example Request

```http
GET /api/admin/solvers/sol-221/workload/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
