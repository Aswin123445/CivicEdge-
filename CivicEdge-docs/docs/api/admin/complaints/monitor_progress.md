# 📊 Monitor Complaint Progress

**Endpoint:** `GET /api/admin/complaints/{id}/progress/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **monitor the real-time progress of an approved complaint**.

It aggregates solver updates, media uploads, status changes, and timestamps to provide a complete execution timeline from approval to resolution.

This view helps admins track performance, delays, and completion quality.

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
GET /api/admin/complaints/cmp-1023/progress/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
