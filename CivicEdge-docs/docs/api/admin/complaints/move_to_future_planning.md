# ⏳ Move Complaint to Future Planning

**Endpoint:** `POST /api/admin/complaints/{id}/future-plan/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **move a complaint to future planning** when the issue cannot be resolved immediately due to budget constraints, infrastructure dependency, policy requirements, or long-term execution planning.

Instead of closing or rejecting the complaint, it is preserved as a **planned civic issue** for future action.

This ensures transparency while setting realistic expectations for citizens.

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
  "planning_reason": "High infrastructure cost. Scheduled for next quarterly budget.",
  "expected_action_period": "Q2 2026"
}
