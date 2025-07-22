# 🖼️ View Complaint Media

This endpoint allows **solvers** to view media (images/videos) attached to a complaint that is linked to their assigned task.

---

## 🔗 Endpoint

`GET /api/solver/tasks/{task_id}/complaint/media/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Must be a solver assigned to the task via `task_assignments`.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `task_id` | `uuid` | ✅ | ID of the assigned task (which references a complaint) |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
[
  {
    "media_id": "3d12...",
    "media_type": "image",
    "url": "https://s3.bucket.com/complaints/media/img123.jpg",
    "uploaded_at": "2025-07-13T10:30:00Z"
  },
  {
    "media_id": "5c89...",
    "media_type": "video",
    "url": "https://s3.bucket.com/complaints/media/vid456.mp4",
    "uploaded_at": "2025-07-13T10:35:00Z"
  }
]
