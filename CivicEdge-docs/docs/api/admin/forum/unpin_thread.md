# 📍 Unpin Forum Thread

**Endpoint:** `POST /api/admin/forum/threads/{thread_id}/unpin/`  
**Auth Required:** ✅ Yes (Admin / Moderator Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators or moderators to **remove a pinned forum thread from the top position**.

Unpinning is typically used when:
- announcements are no longer relevant
- discussions have concluded
- pinned slots need to be freed for newer updates

---

## 🔐 Authentication

Include a valid admin or moderator token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `thread_id` | UUID | ✅ | Forum thread ID |

---

## 🔄 Unpin Behavior

- Thread status → `active`
- Thread returns to normal chronological order
- Pin indicator removed
- Action logged in moderation logs

---

## ✅ Example Success Response

```json
{
  "success": true,
  "message": "Thread unpinned successfully.",
  "data": {
    "thread_id": "thr-221",
    "unpinned_by": "admin-12",
    "unpinned_at": "2026-02-23T15:10:00Z"
  }
}
