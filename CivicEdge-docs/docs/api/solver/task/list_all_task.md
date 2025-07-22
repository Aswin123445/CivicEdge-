# 📋 List Assigned Tasks

Retrieve a list of all tasks currently assigned to the logged-in solver. These tasks originate from complaints raised by citizens and require solver action.

---

## 🔗 Endpoint

`GET /api/solver/tasks/`

---

## 🔐 Authentication

**Required:** Yes  
**Header:** `Authorization: Bearer <access_token>`  
The user must have the role `solver`.

---

## 📥 Request Parameters

| Parameter | Type | In | Required | Description |
|----------|------|----|----------|-------------|
| `status` | `string` | query | ❌ | Filter by task status (`assigned`, `in_progress`, `resolved`) |
| `priority` | `string` | query | ❌ | Filter by task priority (`low`, `medium`, `high`) |
| `zone` | `string` | query | ❌ | Optional zone filter (if applicable) |
| `page` | `int` | query | ❌ | Page number for pagination |
| `limit` | `int` | query | ❌ | Number of results per page |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "count": 2,
  "page": 1,
  "tasks": [
    {
      "id": "9a21c6af-13e0-4cbe-89be-f0b2f5193b7c",
      "title": "Repair leaking water pipe",
      "description": "Leaking pipe behind school building",
      "status": "assigned",
      "priority": "high",
      "complaint_id": "5f612a23-21de-4cc1-905b-d45b9d6ffb34",
      "location": "Ward 4, West Street",
      "assigned_at": "2025-07-14T10:15:00Z",
      "created_at": "2025-07-13T12:00:00Z"
    },
    {
      "id": "7a33f5f0-b9f1-4821-8f51-4ef0f0aa3ad0",
      "title": "Clean clogged drain",
      "description": "Drain blocked near community hall",
      "status": "in_progress",
      "priority": "medium",
      "complaint_id": "8c8237d5-49a4-4372-bbbc-d125f1a789aa",
      "location": "Zone B - Sector 6",
      "assigned_at": "2025-07-12T09:45:00Z",
      "created_at": "2025-07-11T14:30:00Z"
    }
  ]
}
