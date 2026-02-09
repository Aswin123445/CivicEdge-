# 🗳️ Vote in a Poll

**Endpoint:** `POST /api/forum/polls/{id}/vote`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an authenticated citizen to **cast a vote in an active poll**.

Voting rules:
- each citizen can vote **only once per poll**
- votes cannot be changed after submission
- voting is allowed only while the poll is active

This ensures fair and transparent civic participation.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique poll ID |

---

## 🧾 Request Body

```json
{
  "option_id": "opt2"
}
