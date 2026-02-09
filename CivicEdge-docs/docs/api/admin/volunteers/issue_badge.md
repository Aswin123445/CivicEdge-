# 🏵️ Issue Volunteer Badge

**Endpoint:** `POST /api/admin/volunteers/badges/issue/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **issue achievement badges to volunteers** in recognition of their civic contributions.

Badges represent **non-monetary recognition** and encourage long-term engagement, discipline, and community leadership.

Unlike certificates (event-based), badges are typically awarded for:
- consistency
- commitment
- leadership
- special service
- milestone achievements

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "user_id": "usr-341",
  "badge_type": "community_champion",
  "remarks": "Outstanding contribution across multiple clean-up drives."
}
