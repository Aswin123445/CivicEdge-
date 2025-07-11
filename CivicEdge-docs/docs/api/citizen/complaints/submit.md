# 📝 Submit a Complaint

**Endpoint:** `POST /api/complaints/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to submit a new civic complaint. The complaint may optionally include GPS coordinates and can later have media (images/videos) attached separately.

---

## 🔐 Authentication

Include the JWT access token in the `Authorization` header:


---

## 📥 Request Body

```json
{
  "category": "Sanitation",
  "description": "Garbage pile near the community park hasn't been cleared for 3 days.",
  "location": "Ward 12, Park Avenue",
  "latitude": 12.9716,
  "longitude": 77.5946
}
{
  "id": "ab4c1e57-f253-4815-86df-5a3b3b71ad1d",
  "status": "open",
  "created_at": "2025-07-07T12:05:43Z",
  "message": "Complaint submitted successfully."
}
