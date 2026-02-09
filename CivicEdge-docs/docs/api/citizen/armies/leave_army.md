# 🚪 Leave Community Army

**Endpoint:** `POST /api/citizen/armies/{id}/leave`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an authenticated citizen to **leave a community army** they have previously joined.

Leaving an army:
- removes the citizen from future event notifications
- revokes eligibility to participate in new army events
- does not delete past participation records or certificates

This ensures contribution history and civic records remain intact.

---

## 🔐 Authentication

Include the JWT access token in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique army ID |

---

## ✅ Example Request

```http
POST /api/citizen/armies/army-123e4567/leave
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
