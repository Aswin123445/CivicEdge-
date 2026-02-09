# ⚠️ Warn User

**Endpoint:** `POST /api/admin/forum/users/{user_id}/warn/`  
**Auth Required:** ✅ Yes (Admin / Moderator Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators or moderators to **issue a formal warning to a user** for violating forum or community guidelines.

Warnings are part of a **progressive moderation system**, intended to correct behavior before harsher actions such as suspension or bans are applied.

Each warning is recorded permanently for audit and escalation purposes.

---

## 🔐 Authentication

Include a valid admin or moderator token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | UUID | ✅ | User receiving the warning |

---

## 🧾 Request Body

```json
{
  "reason": "Repeated use of inappropriate language in discussions.",
  "related_content_id": "cmt-882"
}
