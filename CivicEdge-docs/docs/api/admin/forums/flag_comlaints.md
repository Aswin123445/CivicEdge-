# 🚫 Delete or Flag Complaint

This endpoint allows **administrators** to either **delete** a complaint from the system or **flag** it as inappropriate, false, or abusive. Flagged complaints can later be reviewed or used for moderation and accountability.

---

## 🔗 Endpoint

`PATCH /api/admin/complaints/{complaint_id}/moderate/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Must be an admin user.

---

## 🧾 Path Parameters

| Parameter        | Type   | Required | Description                     |
|------------------|--------|----------|---------------------------------|
| `complaint_id`   | `uuid` | ✅       | ID of the complaint to moderate |

---

## 📝 Request Body

```json
{
  "action": "flag",  // Options: "flag" or "delete"
  "reason": "This complaint contains offensive language"
}
