# 📜 View Complaint Status Logs

**Endpoint:** `GET /api/admin/complaints/{id}/status-logs/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve the **complete status history of a complaint**.

Status logs provide a chronological audit trail of all actions performed on a complaint — including verification, assignment, inspection submission, approvals, planning decisions, progress updates, and closure.

This ensures full transparency and traceability for governance and review purposes.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique complaint ID |

---

## ✅ Example Request

```http
GET /api/admin/complaints/cmp-1023/status-logs/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
