# ✅ Unblock Solver

**Endpoint:** `POST /api/admin/solvers/{id}/unblock/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **unblock a previously blocked solver account** after review or resolution of disciplinary concerns.

Once unblocked, the solver regains:
- login access
- eligibility to receive complaint assignments

Unblocking does **not automatically activate** the solver if their status is inactive.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique solver ID |

---

## 🧾 Request Body (Optional)

```json
{
  "remarks": "Issue reviewed and solver cleared to resume duties."
}
