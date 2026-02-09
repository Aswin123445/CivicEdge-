# 📊 Poll Results

**Endpoint:** `GET /api/admin/polls/{poll_id}/results/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view the results of a poll**, including vote counts and participation statistics.

Poll results are available:
- after a poll is closed, or
- after it has automatically expired

Results are immutable and serve as an official record of civic opinion.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `poll_id` | UUID | ✅ | Poll identifier |

---

## 🔄 Result Visibility Rules

| Poll Status | Results Available |
|------------|------------------|
| `active` | ❌ (restricted) |
| `closed` | ✅ |
| `expired` | ✅ |

(Admin-only preview during active phase may be allowed optionally.)

---

## ✅ Example Request

```http
GET /api/admin/polls/poll-501/results/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
