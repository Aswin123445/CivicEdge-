# ➕ Create Solver

**Endpoint:** `POST /api/admin/solvers/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **create a new solver account** in the CivicEdge platform.

Solvers are civic field workers responsible for inspecting complaints, submitting reports, and monitoring approved resolutions.

Solver accounts **cannot self-register**.  
All solver onboarding is strictly controlled by administrators.

Upon creation:
- a solver user account is generated
- a temporary password is issued
- the solver must change their password on first login

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "name": "Ramesh Kumar",
  "email": "ramesh.solver@civicedge.in",
  "phone": "+91XXXXXXXXXX",
  "zone": "Ward 11",
  "skills": ["sanitation", "waste_management"]
}
