# 🔄 Update Task Status

Allows the **assigned solver** to update the current status of their task — such as marking it as `in_progress` or `resolved`. Solvers may also provide optional notes explaining the update.

---

## 🔗 Endpoint

`POST /api/solver/tasks/{task_id}/status-update/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Only accessible to the solver assigned to the task.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `task_id` | `uuid` | ✅ | Unique identifier of the task being updated |

---

## 📥 Request Body

Send as `application/json`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `string` | ✅ | New task status (`in_progress` or `resolved`) |
| `note` | `string` | ❌ | Optional comment or context on the status change |

> ⚠️ Allowed values for `status`: `"in_progress"`, `"resolved"`

### Example

```json
{
  "status": "in_progress",
  "note": "Reached the location. Starting the repair work."
}
