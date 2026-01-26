# ⏸️ Deactivate Solver

**Endpoint:** `POST /api/admin/solvers/{id}/deactivate/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **temporarily deactivate a solver account**.

A deactivated solver:
- cannot receive new complaint assignments
- may retain login access (based on system configuration)
- remains part of historical records

Deactivation is typically used when a solver is:
- on leave
- temporarily unavailable
- reassigned to non-field duties

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
  "remarks": "Deactivated due to temporary leave."
}
