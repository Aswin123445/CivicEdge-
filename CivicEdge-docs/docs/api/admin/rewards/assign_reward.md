# 🎁 Assign Reward

**Endpoint:** `POST /api/admin/rewards/assign/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **assign a reward to one or more users**.

Rewards can be issued to:
- citizens
- volunteers
- solvers

Rewards are used to recognize civic contribution, consistency, leadership, or outstanding service.

Once assigned, the reward is recorded permanently in the user’s reward history.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "reward_id": "rw-101",
  "user_ids": [
    "usr-341",
    "usr-529"
  ],
  "remarks": "Top civic contributors for January"
}
