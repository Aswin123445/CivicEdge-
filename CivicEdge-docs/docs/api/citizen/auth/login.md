# 🔐 Citizen Login

**Endpoint:** `POST /api/auth/login`  
**Auth Required:** ❌ No  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a registered and verified citizen to **log in** to the CivicEdge platform using their email and password.

Upon successful authentication:
- A **JWT access token** is issued for authorized API access
- A **refresh token** is issued for session continuity
- The citizen can access protected platform features

---

## 🔐 Authentication

No authentication is required for this endpoint.

---

## 📥 Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | ✅ | Registered email address |
| `password` | string | ✅ | Account password |

---

## ✅ Example Request

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "citizen@example.com",
  "password": "StrongPassword@123"
}
