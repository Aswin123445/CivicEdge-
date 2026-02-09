# 📧 Verify Email

**Endpoint:** `POST /api/auth/verify-email`  
**Auth Required:** ❌ No  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint verifies a citizen’s email address after registration.

When a user registers, a **verification link or token** is sent to their email.  
The account remains inactive until this verification step is completed.

Successful verification:
- Activates the user account
- Marks the email as verified
- Allows the citizen to log in and access protected APIs

---

## 🔐 Authentication

No authentication is required for this endpoint.

---

## 📥 Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | ✅ | Email verification token received via email |

---

## ✅ Example Request

```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.verify.token"
}
