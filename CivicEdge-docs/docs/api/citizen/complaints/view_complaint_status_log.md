# 📊 View Complaint Status Log

**Endpoint:** `GET /api/complaints/{id}/status-log/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint returns the **status timeline** of a specific complaint submitted by the user. It includes all status changes (e.g., submitted, assigned, in_progress, resolved) along with timestamps and optional notes.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description              |
|-----------|------|----------|--------------------------|
| `id`      | UUID | ✅        | Unique complaint ID      |

---

## ✅ Example Request

```http
GET /api/complaints/f8e2a5b4/status-log/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...

{
  "success": true,
  "message": "Status log retrieved successfully.",
  "logs": [
    {
      "status": "submitted",
      "updated_by": "Aswin Sandeep",
      "note": "Initial complaint submission.",
      "timestamp": "2025-07-06T14:20:00Z"
    },
    {
      "status": "assigned",
      "updated_by": "Admin Jane",
      "note": "Assigned to Solver John",
      "timestamp": "2025-07-07T08:00:00Z"
    },
    {
      "status": "in_progress",
      "updated_by": "Solver John",
      "note": "On-site inspection started.",
      "timestamp": "2025-07-07T11:32:00Z"
    },
    {
      "status": "resolved",
      "updated_by": "Solver John",
      "note": "Issue fixed, uploaded proof.",
      "timestamp": "2025-07-07T16:45:00Z"
    }
  ]
}
