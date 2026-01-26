# ❌ Remove Volunteer Member

**Endpoint:** `POST /api/admin/volunteers/groups/{group_id}/members/{user_id}/remove/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **remove a volunteer from a specific group (army)**.

Removal may be required due to:
- inactivity
- misconduct
- violation of guidelines
- administrative restructuring
- voluntary exit confirmation

This action removes the user’s active membership while preserving historical participation records.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `group_id` | UUID | ✅ | Volunteer group ID |
| `user_id` | UUID | ✅ | Volunteer user ID |

---

## 🧾 Request Body (Optional)

```json
{
  "reason": "Repeated absence from scheduled events."
}
