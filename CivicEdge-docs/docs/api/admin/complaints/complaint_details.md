# 🔍 Complaint Details

**Endpoint:** `GET /api/admin/complaints/{id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve the **complete details of a specific complaint** submitted by a citizen.

It provides all information required for verification, assignment, inspection review, approval decisions, and final closure.

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
GET /api/admin/complaints/f8e2a5b4-2b47-4d3f-bdc9-75f6a3df9fc2/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
