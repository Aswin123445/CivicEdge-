# 💬 View Feedback on Task

After a task linked to a complaint is marked as resolved, the citizen has the option to leave feedback. This endpoint allows the assigned **solver** to view that feedback.

---

## 🔗 Endpoint

`GET /api/solver/tasks/{task_id}/feedback/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Only available to the solver assigned to the task.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `task_id` | `uuid` | ✅ | The ID of the task whose feedback you want to view |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "feedback_id": "f63d...",
  "rating": 4,
  "comment": "Great work, the issue was resolved quickly!",
  "submitted_by": "citizen_name",
  "submitted_at": "2025-07-14T13:45:00Z"
}
