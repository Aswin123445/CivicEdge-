# 🔄 Submit Task Update

**Endpoint:** `POST /api/solver/tasks/{id}/update/`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an assigned solver to **submit progress or completion updates** for a task that has been approved for execution.

Task updates are used to:
- track ongoing work
- report milestones
- submit completion notes
- support final verification

Each update is logged and becomes part of the task’s audit history.

---

## 🔐 Authentication

Include the solver access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Task ID |

---

## 🧾 Request Body

```json
{
  "update_type": "progress",
  "remarks": "Service provider has started cleaning work.",
  "percentage_completed": 40
}
