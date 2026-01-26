# ✋ Join Army Event

**Endpoint:** `POST /api/citizen/armies/events/{id}/join`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an authenticated citizen to **register for a community army event**.

Event participation is subject to the following rules:

- Citizen must be an **active member of the associated army**
- Event must be **active or upcoming**
- Registration may be limited by **required volunteer count**

This ensures structured and responsible civic participation.

---

## 🔐 Authentication

Include the JWT access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique event ID |

---

## 🧾 Request Body

No request body is required.

```json
{}
