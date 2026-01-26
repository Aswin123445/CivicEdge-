# 🧑‍🔧 Assign Solver

**Endpoint:** `POST /api/admin/complaints/{id}/assign/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **assign a verified complaint to a solver** for on-site inspection and evaluation.

Assignment initiates the operational phase where the solver visits the location, studies the issue, and submits an inspection report for administrative decision-making.

Only verified complaints are eligible for solver assignment.

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
  "solver_id": "sol-221",
  "remarks": "Assigned based on sanitation expertise and ward coverage."
}
