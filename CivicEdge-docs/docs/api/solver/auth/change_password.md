# 🔁 Change Password

**Endpoint:** `POST /api/solver/auth/change-password`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a solver to **change their account password**.

Solvers are required to update their password after the first login when using admin-provided temporary credentials.  
This ensures account security and prevents continued use of shared or default passwords.

Password changes can also be performed later for routine security updates.

---

## 🔐 Authentication

Include the solver access token in the request header:


---

## 🧾 Request Body

```json
{
  "current_password": "Temp@1234",
  "new_password": "Secure@9876",
  "confirm_password": "Secure@9876"
}
