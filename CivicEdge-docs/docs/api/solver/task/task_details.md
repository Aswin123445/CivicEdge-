# 🔍 View Task Details

Retrieve full details of a specific task assigned to the logged-in solver, including complaint info, assignment data, and current status.

---

## 🔗 Endpoint

`GET /api/solver/tasks/{task_id}/`

---

## 🔐 Authentication

**Required:** Yes  
**Header:** `Authorization: Bearer <access_token>`  
The user must be a verified solver.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `task_id` | `uuid` | ✅ | Unique identifier of the task |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "id": "9a21c6af-13e0-4cbe-89be-f0b2f5193b7c",
  "title": "Repair leaking water pipe",
  "description": "Leaking pipe behind school building",
  "status": "assigned",
  "priority": "high",
  "created_at": "2025-07-13T12:00:00Z",
  "updated_at": "2025-07-14T10:15:00Z",
  "complaint": {
    "id": "5f612a23-21de-4cc1-905b-d45b9d6ffb34",
    "category": "Water",
    "description": "Water leaking constantly in public area",
    "location": "Ward 4, West Street",
    "latitude": 10.012345,
    "longitude": 76.123456,
    "submitted_by": {
      "name": "Rahul S",
      "phone": "+91-9876543210"
    },
    "media": [
      {
        "type": "image",
        "url": "https://cdn.smartcity.gov.in/media/pipe_leak.jpg"
      }
    ]
  },
  "assignment": {
    "assigned_by": {
      "name": "Admin Maya"
    },
    "assigned_at": "2025-07-14T09:00:00Z"
  }
}
