# 💬 View Complaint Feedback

This endpoint allows **admins** to view feedback provided by citizens after a complaint has been resolved. It helps assess citizen satisfaction and service quality.

---

## 🔗 Endpoint

`GET /api/admin/complaints/{complaint_id}/feedback/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Only users with the `admin` role are authorized.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `complaint_id` | `uuid` | ✅ | Unique ID of the complaint |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "feedback_id": "fb-9383af27",
  "complaint_id": "cmp-139c67ad",
  "rating": 4,
  "comment": "The issue was resolved quickly. Appreciated!",
  "submitted_by": {
    "user_id": "user-8493df",
    "name": "Aswin Sandeep"
  },
  "submitted_at": "2025-07-15T08:45:00Z"
}
