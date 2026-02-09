# ⬇️ Download Certificate

**Endpoint:** `GET /api/citizen/armies/certificates/{id}/download`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/pdf`

---

## 📌 Description

This endpoint allows an authenticated citizen to **download a previously issued community service certificate**.

Certificates are generated after verified participation in army events and serve as official recognition of civic contribution.

Only certificates belonging to the authenticated citizen can be accessed.

---

## 🔐 Authentication

Include the JWT access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique certificate ID |

---

## ✅ Example Request

```http
GET /api/citizen/armies/certificates/cert-123abc/download
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
