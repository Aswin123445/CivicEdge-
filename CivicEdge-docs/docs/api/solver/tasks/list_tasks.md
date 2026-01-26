# 📋 List Assigned Tasks

**Endpoint:** `GET /api/solver/tasks/`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves **all civic tasks assigned to the authenticated solver**.

Each task represents a complaint-based civic issue that requires on-site inspection, reporting, and monitoring.  
The response provides high-level task information to help solvers prioritize and manage their daily workload.

Only tasks currently assigned to the solver are returned.

---

## 🔐 Authentication

Include the solver JWT token in the request header:


---

## 🔎 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by task status (`assigned`, `inspected`, `approved`, `in_execution`, `resolved`) |
| `priority` | string | `low`, `medium`, `high`, `urgent` |
| `page` | integer | Page number |
| `limit` | integer | Number of tasks per page |

---

## ✅ Example Request

```http
GET /api/solver/tasks/?status=assigned&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
