# 🔑 Admin Login

**Endpoint:** `POST /api/admin/auth/login`  
**Auth Required:** ❌ No  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an **administrator** to log in to the CivicEdge platform using credentials created by the **Superuser**.

Admins cannot self-register. Access is granted only to accounts explicitly created or promoted by the Superuser.

Upon successful authentication, the system issues:
- an **access token** for authorized admin operations
- a **refresh token** for session continuity

If the admin is logging in for the first time, they will be required to **change their password immediately**.

---

## 🔐 Authentication

No authentication is required for this endpoint.

---

## 🧾 Request Body

```json
{
  "email": "admin@civicedge.in",
  "password": "Temp@Admin123"
}
