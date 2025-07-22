# 📷 Upload Resolution Media

Enables an assigned **solver** to upload image or video proof as part of a task update. Media files help verify that the task was completed or progressed with valid evidence.

---

## 🔗 Endpoint

`POST /api/solver/tasks/{task_id}/media-upload/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Only available to the solver assigned to the task.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `task_id` | `uuid` | ✅ | The task for which the media is being uploaded |

---

## 📥 Request Format

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `media_file` | `file` | ✅ | Image or video file |
| `media_type` | `string` | ✅ | Type of media (`image` or `video`) |
| `update_id` | `uuid` | ✅ | Related task update submission ID |

### Example with `curl`

```bash
curl -X POST http://localhost:8000/api/solver/tasks/1234/media-upload/ \
  -H "Authorization: Bearer <token>" \
  -F "media_file=@repair_done.jpg" \
  -F "media_type=image" \
  -F "update_id=5678"
