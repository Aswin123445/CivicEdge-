# 📅 Create Volunteer Event

**Endpoint:** `POST /api/admin/volunteers/events/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **create a volunteer event** under a specific volunteer group (army).

Events represent organized civic activities such as clean-up drives, awareness campaigns, relief work, or emergency response operations.

Event eligibility is determined by the **tier of the associated volunteer group**.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "group_id": "vg-102",
  "title": "Ward 11 Cleanliness Drive",
  "description": "Community cleanup activity near market area.",
  "event_date": "2026-02-02T07:00:00Z",
  "location": "Ward 11 Market Road",
  "max_participants": 50
}
