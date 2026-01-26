# 🗳️ Create Poll

**Endpoint:** `POST /api/admin/polls/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **create a new civic poll** to gather public opinion or feedback from citizens.

Polls can be used for:
- community decision-making
- public consultations
- feedback on civic initiatives
- prioritizing development plans

Only administrators are authorized to create polls.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "title": "Should plastic bags be banned in Ward 11?",
  "description": "Help us decide whether to enforce a complete ban on single-use plastic bags.",
  "options": [
    "Yes, enforce immediately",
    "No, need awareness first",
    "Undecided"
  ],
  "expires_at": "2026-03-01T23:59:59Z",
  "visibility": "public"
}
