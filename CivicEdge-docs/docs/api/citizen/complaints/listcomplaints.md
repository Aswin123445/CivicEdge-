# 📋 List My Complaints

**Endpoint:** `GET /api/complaints/mine/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint returns a list of all complaints submitted by the **currently authenticated citizen**. It supports optional filtering and pagination.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🧾 Optional Query Parameters

| Parameter | Type   | Description                                                        |
|-----------|--------|--------------------------------------------------------------------|
| `status`  | string | Filter by complaint status: `open`, `in_progress`, `resolved`      |
| `search`  | string | Search complaints by title or description                          |
| `limit`   | int    | Number of items per page                                            |
| `offset`  | int    | Number of items to skip (for pagination)                           |

---

## ✅ Example Request

```http
GET /api/complaints/mine/?status=open&limit=5&offset=0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...

{
  "success": true,
  "message": "Complaints fetched successfully.",
  "data": [
    {
      "id": "c1a2f4d8-9100-4d99-b6a1-9c28ad0136d2",
      "title": "Broken streetlight",
      "description": "Streetlight not working in front of house 17.",
      "location": "Sector 7, Main Road",
      "status": "open",
      "created_at": "2025-07-06T19:15:24Z"
    },
    {
      "id": "f8e2a5b4-2b47-4d3f-bdc9-75f6a3df9fc2",
      "title": "Overflowing garbage bin",
      "description": "Garbage bin not cleared for 4 days.",
      "location": "Ward 11, Cross Street",
      "status": "resolved",
      "created_at": "2025-06-30T11:52:00Z"
    }
  ]
}
