# 🔍 Task Details

**Endpoint:** `GET /api/solver/tasks/{id}/`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **complete details of a specific task assigned to the authenticated solver**.

Each task originates from a citizen complaint and includes contextual information required for inspection, reporting, and resolution monitoring.

This endpoint provides solvers with:
- complaint context
- location details
- current task status
- inspection and update history (summary)

Only tasks assigned to the solver can be accessed.

---

## 🔐 Authentication

Include the solver access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique task ID |

---

## ✅ Example Request

```http
GET /api/solver/tasks/task-123abc/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
