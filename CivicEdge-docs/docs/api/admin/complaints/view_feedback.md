# ⭐ View Complaint Feedback

**Endpoint:** `GET /api/admin/complaints/{id}/feedback/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view feedback submitted by the citizen** after a complaint has been closed.

Feedback helps evaluate:
- resolution quality
- solver performance
- administrative efficiency
- overall citizen satisfaction

This data is used for analytics, reporting, and service improvement.

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
GET /api/admin/complaints/cmp-1023/feedback/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
