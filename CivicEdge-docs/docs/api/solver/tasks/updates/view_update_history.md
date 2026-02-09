# 📜 View Task Update History

**Endpoint:** `GET /api/solver/tasks/{id}/updates/`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **complete update history of a specific task** assigned to the authenticated solver.

The update history includes:
- progress updates
- completion submissions
- timestamps
- associated remarks
- linked media references

This endpoint ensures full transparency and enables solvers and administrators to track the lifecycle of task execution.

---

## 🔐 Authentication

Include the solver access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Task ID |

---

## ✅ Example Request

```http
GET /api/solver/tasks/task-123abc/updates/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
