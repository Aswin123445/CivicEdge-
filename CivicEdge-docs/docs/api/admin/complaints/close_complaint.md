# ✅ Close Complaint

**Endpoint:** `POST /api/admin/complaints/{id}/close/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **formally close a complaint** after verifying that the reported issue has been fully resolved.

Closing a complaint confirms successful completion and triggers citizen feedback collection.

Only administrators have the authority to close complaints.

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
  "closure_remarks": "Issue resolved and verified on-site."
}
