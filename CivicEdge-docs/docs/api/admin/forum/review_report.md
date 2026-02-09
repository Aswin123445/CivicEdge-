# 🔍 Review Reported Content

**Endpoint:** `POST /api/admin/forum/reports/{report_id}/review/`  
**Auth Required:** ✅ Yes (Admin / Moderator Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators or moderators to **review a reported forum thread or comment** and take an official moderation decision.

Reviewing a report marks it as handled and determines whether the content is acceptable or violates community guidelines.

This step is mandatory before deleting, warning, or dismissing reports.

---

## 🔐 Authentication

Include a valid admin or moderator token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `report_id` | UUID | ✅ | Report identifier |

---

## 🧾 Request Body

```json
{
  "action": "approve",
  "remarks": "Content reviewed and found to be acceptable."
}
