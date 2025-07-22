# ✅ Verify Complaint

This endpoint allows **admins** to verify a complaint submitted by a citizen. Verification confirms the complaint as valid and ready for assignment to a solver.

---

## 🔗 Endpoint

`PATCH /api/admin/complaints/{complaint_id}/verify/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Only accessible to users with `admin` role.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `complaint_id` | `uuid` | ✅ | ID of the complaint to be verified |

---

## 📥 Request Body

No body is required. The verification is handled by the endpoint logic.

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "message": "Complaint verified successfully.",
  "complaint_id": "8fc3a1b4-523f-48be-a8c0-5c6dbd17c4e2",
  "status": "verified",
  "verified_at": "2025-07-15T11:22:30Z",
  "verified_by": "admin_123"
}
