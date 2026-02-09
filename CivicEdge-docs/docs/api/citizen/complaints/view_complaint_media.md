# 📂 View Complaint Media

**Endpoint:** `GET /api/complaints/{id}/media/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves all media files (images/videos) associated with a specific complaint submitted by the user. It returns public URLs of the uploaded files.

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
GET /api/complaints/abc123/media/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...

{
  "success": true,
  "message": "Media retrieved successfully.",
  "media": [
    "https://cdn.example.com/media/complaints/abc123/before.jpg",
    "https://cdn.example.com/media/complaints/abc123/after.jpg",
    "https://cdn.example.com/media/complaints/abc123/video.mp4"
  ]
}
