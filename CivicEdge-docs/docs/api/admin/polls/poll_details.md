# 📊 Poll Details

**Endpoint:** `GET /api/admin/polls/{poll_id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **retrieve complete details of a specific poll**, including its configuration, options, status, and participation metrics.

It is primarily used for:
- reviewing poll setup
- monitoring voting progress
- validating poll configuration before closure
- viewing historical civic decisions

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `poll_id` | UUID | ✅ | Poll identifier |

---

## ✅ Example Request

```http
GET /api/admin/polls/poll-501/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
