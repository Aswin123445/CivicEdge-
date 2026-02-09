# 📜 List Certificates

**Endpoint:** `GET /api/citizen/armies/certificates/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves **all community service certificates issued to the authenticated citizen**.

Certificates are generated only after:
- verified participation in an army event
- attendance confirmation by admin or coordinator

These certificates serve as official recognition of civic contribution.

---

## 🔐 Authentication

Include the JWT access token in the request header:


---

## 🔎 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `army_id` | UUID | Filter certificates by army |
| `event_id` | UUID | Filter certificates by event |
| `page` | integer | Page number |
| `limit` | integer | Number of certificates per page |

---

## ✅ Example Request

```http
GET /api/citizen/armies/certificates?page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
