# 🗑️ Delete Forum Content

**Endpoint:** `POST /api/admin/forum/content/{content_id}/delete/`  
**Auth Required:** ✅ Yes (Admin / Moderator Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators or moderators to **remove forum content** that violates community guidelines.

The deletion can apply to:
- forum threads
- forum comments

By default, content is **soft deleted** to preserve audit history and transparency.

---

## 🔐 Authentication

Include a valid admin or moderator token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `content_id` | UUID | ✅ | Thread or comment ID |

---

## 🧾 Request Body

```json
{
  "content_type": "comment",
  "reason": "Use of abusive or offensive language"
}
