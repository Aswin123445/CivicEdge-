# 🔍 Volunteer Event Details

**Endpoint:** `GET /api/admin/volunteers/events/{id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve the **complete details of a specific volunteer event**.

It provides information about the event, its associated volunteer group, participation status, and engagement metrics, enabling admins to effectively manage and evaluate civic activities.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Volunteer event ID |

---

## ✅ Example Request

```http
GET /api/admin/volunteers/events/ev-501/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
