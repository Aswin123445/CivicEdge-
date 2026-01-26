# ❌ Revoke Reward

**Endpoint:** `POST /api/admin/rewards/{user_reward_id}/revoke/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **revoke a previously assigned reward** from a user.

Reward revocation is used only in exceptional cases such as:
- incorrect assignment
- rule violation discovered later
- administrative correction
- abuse or misuse of reward eligibility

Revoked rewards remain in history for audit purposes but are marked as inactive.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_reward_id` | UUID | ✅ | Assigned reward record ID |

---

## 🧾 Request Body

```json
{
  "reason": "Reward assigned mistakenly during monthly review."
}
