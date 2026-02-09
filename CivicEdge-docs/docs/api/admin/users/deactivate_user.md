# ⏸️ Deactivate User

**Endpoint:** `POST /api/admin/users/{id}/deactivate/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **temporarily deactivate a user account**.

A deactivated user:
- cannot access platform features
- cannot submit complaints, posts, or interactions
- remains part of historical system records

Deactivation is commonly used for:
- temporary suspensions
- policy warnings
- investigation periods
- misuse review

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
  "reason": "Temporary suspension due to repeated guideline violations.",
  "remarks": "Account under review."
}
