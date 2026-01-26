# ✅ Activate User

**Endpoint:** `POST /api/admin/users/{id}/activate/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **activate a user account** that was previously deactivated.

Once activated, the user regains full access to platform features according to their role (citizen or solver).

Activation is commonly used when:
- a temporary restriction has ended
- a user’s behavior has been reviewed
- a suspended account is restored

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique user ID |

---

## 🧾 Request Body (Optional)

```json
{
  "remarks": "User access restored after review."
}
