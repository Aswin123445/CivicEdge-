# 📝 Submit Inspection Report

**Endpoint:** `POST /api/solver/tasks/{id}/inspection/`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an assigned solver to **submit an on-site inspection report** for a task.

The inspection report serves as the **primary decision document** for administrators and includes:
- problem assessment
- severity analysis
- estimated budget
- expected resolution timeline
- recommended service providers (if applicable)

Admin decisions regarding approval or future planning are based on this report.

Each task can have only one active inspection report unless revisions are requested.

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
  "issue_summary": "Garbage accumulation due to damaged container.",
  "severity": "high",
  "estimated_budget": 8500,
  "estimated_resolution_time": "2 days",
  "recommended_action": "Replace damaged container and schedule immediate pickup.",
  "suggested_service_providers": [
    {
      "name": "City Waste Services",
      "contact": "9876543210",
      "estimated_cost": 8500
    }
  ],
  "additional_notes": "Area requires temporary barricading during work."
}
