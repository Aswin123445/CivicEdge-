# 🔍 View Complaint Details

Fetch detailed information about a specific complaint submitted by a citizen. Admins can use this to review descriptions, attached media, logs, and assignment status before taking any action.

---

## 🔗 Endpoint
GET /api/admin/complaints/{id}/

---

## 🔐 Authentication

This endpoint requires **Admin** authentication.


---

## 🔢 Path Parameter

| Parameter | Type    | Description              |
|-----------|---------|--------------------------|
| `id`      | integer | ID of the complaint entry |

---

## 📦 Response

```json
{
  "id": 24,
  "title": "Overflowing garbage near park",
  "description": "Garbage hasn't been collected in 5 days.",
  "category": "sanitation",
  "status": "open",
  "created_at": "2025-07-10T10:24:00Z",
  "location": {
    "latitude": 11.2598,
    "longitude": 75.7804
  },
  "user": {
    "id": 101,
    "name": "Amina Hiba",
    "email": "amina@example.com"
  },
  "assigned_solver": {
    "id": 202,
    "name": "Aswin Sandeep"
  },
  "media": [
    {
      "url": "https://example.com/media/complaint_24_1.jpg",
      "type": "image"
    },
    {
      "url": "https://example.com/media/complaint_24_video.mp4",
      "type": "video"
    }
  ],
  "status_logs": [
    {
      "status": "open",
      "timestamp": "2025-07-10T10:24:00Z",
      "updated_by": "system"
    },
    {
      "status": "assigned",
      "timestamp": "2025-07-11T08:12:00Z",
      "updated_by": "admin"
    }
  ],
  "feedback": {
    "rating": 4,
    "comment": "Resolved quickly!"
  }
}
