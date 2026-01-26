# ♻️ Restore Forum Content

**Endpoint:** `POST /api/admin/forum/content/{content_id}/restore/`  
**Auth Required:** ✅ Yes (Admin / Moderator Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators or moderators to **restore previously deleted forum content**.

Content restoration is used when:
- content was deleted mistakenly
- reports were later found invalid
- moderation decision is revised after review

Only **soft-deleted content** can be restored.

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
  "content_type": "thread",
  "reason": "Content restored after secondary moderation review."
}
