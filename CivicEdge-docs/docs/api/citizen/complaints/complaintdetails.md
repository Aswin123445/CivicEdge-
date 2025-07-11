# 🔍 View Complaint Details

**Endpoint:** `GET /api/complaints/{id}/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **full details** of a specific complaint submitted by the currently authenticated citizen. It includes metadata like status, timestamps, location, and media.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description              |
|-----------|------|----------|--------------------------|
| `id`      | UUID | ✅        | Unique complaint ID      |

---

## ✅ Example Request

```http
GET /api/complaints/f8e2a5b4-2b47-4d3f-bdc9-75f6a3df9fc2/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...

{
  "success": true,
  "message": "Complaint retrieved successfully.",
  "data": {
    "id": "f8e2a5b4-2b47-4d3f-bdc9-75f6a3df9fc2",
    "title": "Overflowing garbage bin",
    "description": "Garbage bin not cleared for 4 days.",
    "category": "Sanitation",
    "status": "resolved",
    "location": "Ward 11, Cross Street",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "submitted_by": {
      "id": 42,
      "name": "Aswin Sandeep"
    },
    "assigned_to": {
      "id": 5,
      "name": "Solver John",
      "zone": "Ward 11"
    },
    "media": [
      "https://example.com/media/before.jpg",
      "https://example.com/media/after.jpg"
    ],
    "created_at": "2025-06-30T11:52:00Z",
    "updated_at": "2025-07-01T10:00:00Z"
  }
}
