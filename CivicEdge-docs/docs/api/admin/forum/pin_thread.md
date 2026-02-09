# 📌 Pin Forum Thread

**Endpoint:** `POST /api/admin/forum/threads/{thread_id}/pin/`  
**Auth Required:** ✅ Yes (Admin / Moderator Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators or moderators to **pin a forum thread** so that it appears at the top of the forum or within a specific category.

Pinned threads are typically used for:
- community guidelines
- official announcements
- civic awareness posts
- important discussions

---

## 🔐 Authentication

Include a valid admin or moderator token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `thread_id` | UUID | ✅ | Forum thread ID |

---

## 🔄 Pin Behavior

- Thread status → `pinned`
- Thread displayed above regular posts
- Visual indicator shown (📌)
- Action logged in moderation logs
- Users can still comment unless locked separately

---

## ✅ Example Success Response

```json
{
  "success": true,
  "message": "Thread pinned successfully.",
  "data": {
    "thread_id": "thr-221",
    "pinned_by": "admin-12",
    "pinned_at": "2026-02-23T09:30:00Z"
  }
}
