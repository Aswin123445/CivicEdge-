# 🔄 Reset Password

**Endpoint:** `POST /api/auth/reset-password`  
**Auth Required:** ❌ No  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **set a new password** using a valid password reset token received via email.

It completes the password recovery process initiated through the **Forgot Password** endpoint.

After successful reset:
- The old password becomes invalid
- The reset token is revoked
- The citizen can log in using the new password

---

## 🔐 Authentication

No authentication is required for this endpoint.

---

## 📥 Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | ✅ | Password reset token received via email |
| `new_password` | string | ✅ | New account password |

---

## ✅ Example Request

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.reset.token",
  "new_password": "NewStrongPassword@123"
}
