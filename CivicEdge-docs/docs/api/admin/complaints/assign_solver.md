# 👷 Assign Complaint to Solver

This endpoint allows **admins** to assign a verified complaint to a **solver** for resolution. This creates a task associated with the solver and the complaint.

---

## 🔗 Endpoint

`POST /api/admin/complaints/{complaint_id}/assign/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Only accessible to users with `admin` role.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `complaint_id` | `uuid` | ✅ | The ID of the complaint to be assigned |

---

## 📥 Request Body

```json
{
  "solver_id": "b3e123cd-90a4-4ab1-a0b8-ff34223dfc9a",
  "instructions": "Please resolve within 48 hours and upload proof."
}
