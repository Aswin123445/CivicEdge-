# 📤 Upload Complaint Media

**Endpoint:** `POST /api/complaints/{id}/media/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `multipart/form-data`

---

## 📌 Description

This endpoint allows a citizen to **upload images or videos** related to a previously submitted complaint. Multiple files can be uploaded. Useful for adding visual proof or updates (before and after).

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description              |
|-----------|------|----------|--------------------------|
| `id`      | UUID | ✅        | ID of the complaint      |

---

## 📥 Request Body (Form Data)

| Field   | Type        | Required | Description                         |
|---------|-------------|----------|-------------------------------------|
| `media` | file (or list of files) | ✅ | Images/videos to attach (JPEG, PNG, MP4) |

📝 Use `multipart/form-data` encoding to send files.

---

## 📤 Example Request (cURL)

```bash
curl -X POST https://api.example.com/api/complaints/abc123/media/ \
  -H "Authorization: Bearer <your_token>" \
  -F "media=@before.jpg" \
  -F "media=@after.jpg"

{
  "success": true,
  "message": "Media uploaded successfully.",
  "files": [
    "https://cdn.example.com/media/complaints/abc123/before.jpg",
    "https://cdn.example.com/media/complaints/abc123/after.jpg"
  ]
}
