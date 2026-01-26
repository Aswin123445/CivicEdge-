# ✅ Verify Complaint

**Endpoint:** `POST /api/admin/complaints/{id}/verify/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **verify a complaint submitted by a citizen** after reviewing its details, location, and attached media.

Only verified complaints can be assigned to solvers for inspection and resolution.

Verification confirms that:
- the complaint is genuine
- the issue falls under civic responsibility
- sufficient information is available for further action

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
  "remarks": "Verified after reviewing location and images."
}
