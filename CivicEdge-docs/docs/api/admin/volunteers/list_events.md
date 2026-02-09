# 📋 List Volunteer Events

**Endpoint:** `GET /api/admin/volunteers/events/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve a **list of all volunteer events** created under volunteer groups.

It helps admins monitor upcoming activities, track completed programs, and manage event scheduling across all volunteer armies.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `group_id` | UUID | Filter events by volunteer group |
| `status` | string | `upcoming`, `completed`, `cancelled` |
| `date_from` | date | Filter events from date |
| `date_to` | date | Filter events until date |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/volunteers/events/?status=upcoming&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
