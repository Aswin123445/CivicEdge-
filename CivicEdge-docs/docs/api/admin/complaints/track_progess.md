# 📊 Track Complaint Progress

This endpoint allows **admins** to view the complete progress history (status logs) of a given complaint. It helps in auditing how the complaint has moved through different stages.

---

## 🔗 Endpoint

`GET /api/admin/complaints/{complaint_id}/progress/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Accessible only to users with the `admin` role.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `complaint_id` | `uuid` | ✅ | Unique ID of the complaint |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
[
  {
    "log_id": "d1e04ccf-62d0-4d17-8773-2082be4f8dd5",
    "status": "verified",
    "updated_by": {
      "user_id": "admin-202",
      "role": "admin",
      "name": "Ravi Kumar"
    },
    "remarks": "Verified successfully after review.",
    "timestamp": "2025-07-14T10:32:15Z"
  },
  {
    "log_id": "ed3a123f-c921-4d10-91a3-2101923fba99",
    "status": "assigned",
    "updated_by": {
      "user_id": "admin-202",
      "role": "admin",
      "name": "Ravi Kumar"
    },
    "remarks": "Assigned to solver Akshay.",
    "timestamp": "2025-07-14T12:10:55Z"
  },
  {
    "log_id": "55e789a2-bfce-4f55-9107-b002ec33dcf3",
    "status": "in_progress",
    "updated_by": {
      "user_id": "solver-101",
      "role": "solver",
      "name": "Akshay Menon"
    },
    "remarks": "Reached location, starting fix.",
    "timestamp": "2025-07-14T14:40:00Z"
  },
  {
    "log_id": "22af008f-3214-47f9-a0c0-dfd55b202e00",
    "status": "resolved",
    "updated_by": {
      "user_id": "solver-101",
      "role": "solver",
      "name": "Akshay Menon"
    },
    "remarks": "Issue fixed. Attached resolution media.",
    "timestamp": "2025-07-14T17:05:42Z"
  }
]
