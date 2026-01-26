# ✅ Activate Solver

**Endpoint:** `POST /api/admin/solvers/{id}/activate/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **activate a solver account**.

An active solver:
- can log in to the platform
- can receive new complaint assignments
- can participate in inspection and resolution workflows

Activation is typically used when:
- a new solver joins the system
- a previously deactivated solver returns to service

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
  "remarks": "Solver reactivated after availability confirmation."
}
