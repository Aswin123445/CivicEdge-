# ⛔ Block Solver

**Endpoint:** `POST /api/admin/solvers/{id}/block/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **block a solver account** due to misconduct, repeated SLA violations, misuse of the platform, or security concerns.

A blocked solver:
- cannot log in to the platform
- cannot receive or access assignments
- is completely restricted from operational activities

Blocking is a **strict administrative action** and should be used only when necessary.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique solver ID |

---

## 🧾 Request Body

```json
{
  "reason": "Repeated SLA violations and unresolved complaints.",
  "remarks": "Blocked pending disciplinary review."
}
