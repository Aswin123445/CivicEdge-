# 🧾 Register Citizen

**Endpoint:** `POST /api/auth/register`  
**Auth Required:** ❌ No  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a new citizen to **create an account** on the CivicEdge platform using an email address and password.

After successful registration:
- The user account is created with role `citizen`
- A corresponding profile is initialized
- An **email verification link** is sent to the registered email
- Login is restricted until email verification is completed

---

## 🔐 Authentication

No authentication is required for this endpoint.

---

## 📥 Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | ✅ | Unique email address |
| `password` | string | ✅ | Strong password (min 8 characters) |

---

## ✅ Example Request

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "citizen@example.com",
  "password": "StrongPassword@123"
}
