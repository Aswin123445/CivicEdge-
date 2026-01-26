# 👥 View Event Participants

**Endpoint:** `GET /api/admin/volunteers/events/{event_id}/participants/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view all participants associated with a volunteer event**.

It provides complete visibility into:
- registered volunteers
- approval status (if applicable)
- attendance status after the event

This endpoint is essential for participation control, attendance marking, and certificate issuance.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event_id` | UUID | ✅ | Volunteer event ID |

---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `registered`, `approved`, `attended`, `absent` |
| `search` | string | Search by participant name |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/volunteers/events/ev-501/participants/?status=approved
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
