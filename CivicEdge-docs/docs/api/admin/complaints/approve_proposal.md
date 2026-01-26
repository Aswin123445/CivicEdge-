# ✅ Approve Resolution Proposal

**Endpoint:** `POST /api/admin/complaints/{id}/approve/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **approve the resolution proposal submitted by the solver** after reviewing the inspection report.

Approval authorizes the solver to proceed with execution and monitoring of the complaint resolution.

Only complaints with a submitted inspection report are eligible for approval.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique complaint ID |

---

## 🧾 Request Body (Optional)

```json
{
  "approval_remarks": "Budget and timeline approved. Proceed with resolution."
}
