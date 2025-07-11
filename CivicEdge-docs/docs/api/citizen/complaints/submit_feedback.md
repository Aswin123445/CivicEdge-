# 🌟 Submit Feedback on Complaint

**Endpoint:** `POST /api/complaints/{id}/feedback/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **submit feedback** after their complaint has been marked as resolved. Feedback includes a numeric rating and an optional comment.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description              |
|-----------|------|----------|--------------------------|
| `id`      | UUID | ✅        | ID of the resolved complaint |

---

## 📥 Request Body

```json
{
  "rating": 4,
  "comment": "Issue resolved quickly. Thanks to the team!"
}

{
  "success": true,
  "message": "Feedback submitted successfully."
}
