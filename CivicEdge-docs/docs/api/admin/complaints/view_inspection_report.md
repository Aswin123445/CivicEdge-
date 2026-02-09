# 📝 View Inspection Report

**Endpoint:** `GET /api/admin/complaints/{id}/inspection-report/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view the inspection report submitted by the solver** after visiting the complaint location.

The inspection report provides critical inputs for administrative decision-making, including feasibility, budget estimation, execution timeline, and recommended service providers.

Admins must review this report before approving execution or moving the complaint to future planning.

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
GET /api/admin/complaints/cmp-1023/inspection-report/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
