# 🔍 View Event Details

**Endpoint:** `GET /api/citizen/armies/events/{id}`  
**Auth Required:** ❌ No *(authentication required for registration details)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **complete details of a specific community army event**.

It provides information such as:
- event purpose and description
- associated army
- location and schedule
- participation requirements
- registration status (for authenticated citizens)

Events may be **planned** or **emergency-based**, depending on civic needs.

---

## 🔐 Authentication

Authentication is optional.

If provided, include the JWT access token:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique event ID |

---

## ✅ Example Request

```http
GET /api/citizen/armies/events/event-456abc
