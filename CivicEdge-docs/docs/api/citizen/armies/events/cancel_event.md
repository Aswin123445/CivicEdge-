# ❌ Cancel Event Registration

**Endpoint:** `POST /api/citizen/armies/events/{id}/cancel`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an authenticated citizen to **cancel their registration for a community army event**.

Canceling participation:
- frees a slot for other volunteers
- stops further event notifications related to participation
- does not affect past participation history

This helps ensure efficient coordination and fair opportunity for all citizens.

---

## 🔐 Authentication

Include the JWT access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique event ID |

---

## ✅ Example Request

```http
POST /api/citizen/armies/events/event-456abc/cancel
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
