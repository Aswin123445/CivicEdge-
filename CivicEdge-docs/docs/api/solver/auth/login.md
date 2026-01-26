# 🔑 Solver Login

**Endpoint:** `POST /api/solver/auth/login`  
**Auth Required:** ❌ No  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a **solver (field worker)** to log in to the CivicEdge platform using credentials provided by the administrator.

Solvers cannot self-register. Access is granted only to accounts created by admins.

On successful authentication, the system returns:
- an **access token** for API authorization
- a **refresh token** for session renewal

If the solver is logging in for the first time, they will be required to **change their password immediately**.

---

## 🔐 Authentication

No authentication is required for this endpoint.

---

## 🧾 Request Body

```json
{
  "email": "solver@civicedge.in",
  "password": "Temp@1234"
}
