# ➕ Create Reward

**Endpoint:** `POST /api/admin/rewards/`  
**Auth Required:** ✅ Yes (Admin Token)

---

## Description

Allows admin to create a reward that can later be assigned to users.

---

## Request Body

```json
{
  "name": "Civic Hero",
  "type": "badge",
  "points": 100,
  "description": "Awarded for exceptional civic contribution"
}
