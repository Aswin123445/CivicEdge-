# 👥 My Armies

**Endpoint:** `GET /api/citizen/armies/my`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves **all community armies joined by the authenticated citizen**.

It helps citizens:
- view their active army memberships
- track involvement across service categories
- quickly access related events and activities

Only armies where the citizen is an active member are returned.

---

## 🔐 Authentication

Include the JWT access token in the `Authorization` header:


---

## ✅ Example Request

```http
GET /api/citizen/armies/my
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
