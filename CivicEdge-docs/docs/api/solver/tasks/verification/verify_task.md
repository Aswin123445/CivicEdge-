# ✅ Verify & Close Task

**Endpoint:** `POST /api/solver/tasks/{id}/verify/`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an assigned solver to **verify the completion of a task** after execution by the approved service provider.

Verification confirms that:
- the reported issue has been resolved on-ground
- work quality meets expected standards
- supporting evidence has been uploaded

Once verified, the task is marked as **resolved** and the linked complaint is updated accordingly.

---

## 🔐 Authentication

Include the solver access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Task ID |

---

## 🧾 Request Body

```json
{
  "verification_notes": "Work verified on site. Area cleaned and container replaced successfully.",
  "verified_at_location": true
}
