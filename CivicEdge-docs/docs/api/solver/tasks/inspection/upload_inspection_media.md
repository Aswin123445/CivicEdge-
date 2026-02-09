# 📷 Upload Inspection Media

**Endpoint:** `POST /api/solver/tasks/inspection/{report_id}/media/`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `multipart/form-data`

---

## 📌 Description

This endpoint allows an assigned solver to **upload images or videos related to an inspection report**.

Inspection media provides visual proof of the on-ground condition and supports administrative decision-making during task approval.

Media uploaded through this endpoint is linked specifically to the inspection report.

---

## 🔐 Authentication

Include the solver access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `report_id` | UUID | ✅ | Inspection report ID |

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
POST /api/solver/tasks/inspection/insp-456xyz/media/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
Content-Type: multipart/form-data
