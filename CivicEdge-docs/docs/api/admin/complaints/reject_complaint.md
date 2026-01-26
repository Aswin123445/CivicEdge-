# ❌ Reject Complaint

**Endpoint:** `POST /api/admin/complaints/{id}/reject/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **reject a complaint** that is found to be invalid, irrelevant, duplicate, or outside civic responsibility.

Rejected complaints are closed without assignment and remain recorded for audit and transparency purposes.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique complaint ID |

---

## 🧾 Request Body

```json
{
  "reason": "Duplicate complaint already reported for the same location.",
  "remarks": "Merged with complaint ID CMP-1002."
}
