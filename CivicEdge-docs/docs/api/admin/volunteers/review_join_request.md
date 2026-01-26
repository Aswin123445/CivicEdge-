# ✅ Review Volunteer Join Request

**Endpoint:** `POST /api/admin/volunteers/join-requests/{id}/review/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **review and process a volunteer join request** submitted for a **Tier 2 volunteer group**.

Based on the evaluation of submitted details, the admin can:

- **Approve** the request → user becomes an active group member  
- **Reject** the request → user is denied entry with a recorded reason  

This ensures that only verified and suitable volunteers participate in high-responsibility civic operations.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Join request ID |

---

## 🧾 Request Body

```json
{
  "action": "approve",
  "remarks": "Verified documents and experience."
}
