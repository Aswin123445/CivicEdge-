# 📄 List Volunteer Certificates

**Endpoint:** `GET /api/admin/volunteers/certificates/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve a **list of all volunteer certificates issued across events and groups**.

It helps admins monitor recognition distribution, validate participation history, and support auditing or reporting requirements.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `user_id` | UUID | Filter certificates by volunteer |
| `event_id` | UUID | Filter by event |
| `group_id` | UUID | Filter by volunteer group |
| `date_from` | date | Certificates issued after date |
| `date_to` | date | Certificates issued before date |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/volunteers/certificates/?group_id=vg-102
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
