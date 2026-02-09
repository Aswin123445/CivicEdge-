# 🚩 Report Content

**Endpoint:** `POST /api/forum/reports/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **report inappropriate or abusive content** within the Community Forum.

Reported content may include:
- discussion threads
- comments
- harmful or misleading information

Reports help moderators maintain a respectful, safe, and constructive civic environment.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🧾 Request Body

```json
{
  "target_type": "comment",
  "target_id": "c7d8e9f1-2a3b-4c5d-9e10-112233445566",
  "reason": "Hate speech",
  "description": "The comment contains offensive language."
}
