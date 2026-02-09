# ✅ Approve Event Participation

**Endpoint:** `POST /api/admin/volunteers/events/{event_id}/participation/{user_id}/approve/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **approve a volunteer’s participation in a specific event**.

This approval flow is used only when:
- the event belongs to a **Tier 2 volunteer group**, or
- the event is marked as **restricted or sensitive**

For Tier 1 events, participation is automatically approved.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event_id` | UUID | ✅ | Volunteer event ID |
| `user_id` | UUID | ✅ | Volunteer user ID |

---

## 🔄 Participation Flow

