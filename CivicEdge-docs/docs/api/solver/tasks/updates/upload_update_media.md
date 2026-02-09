# 📷 Upload Task Update Media

**Endpoint:** `POST /api/solver/tasks/update/{update_id}/media/`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `multipart/form-data`

---

## 📌 Description

This endpoint allows an assigned solver to **upload images or videos related to a task update**.

Update media is used to provide **visual evidence of ongoing work or completed resolution**, improving transparency and enabling administrative verification.

Media uploaded through this endpoint is linked specifically to a task update submission.

---

## 🔐 Authentication

Include the solver access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `update_id` | UUID | ✅ | Task update ID |

---

## 🧾 Request Body

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|------|------|----------|-------------|
| `media` | file | ✅ | Image or video file |
| `media_type` | string | ❌ | `image` or `video` (auto-detected if omitted) |

---

## ✅ Example Request

```http
POST /api/solver/tasks/update/upd-789xyz/media/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
Content-Type: multipart/form-data
