# 📊 My Participations

**Endpoint:** `GET /api/citizen/armies/participation/my`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **event participation history of the authenticated citizen**.

It allows citizens to:
- view events they registered for
- track attendance status
- review completed community contributions

Participation records are maintained even if the citizen later leaves the army.

---

## 🔐 Authentication

Include the JWT access token in the request header:


---

## 🔎 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `registered`, `attended`, `absent` |
| `army_id` | UUID | Filter by specific army |
| `page` | integer | Page number |
| `limit` | integer | Number of records per page |

---

## ✅ Example Request

```http
GET /api/citizen/armies/participation/my?page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
