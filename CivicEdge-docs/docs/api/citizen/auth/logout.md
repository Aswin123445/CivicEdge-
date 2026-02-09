# 🔓 Logout

**Endpoint:** `POST /api/auth/logout`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint logs the citizen out of the CivicEdge platform by **invalidating the active refresh token**.

After logout:
- The current session is terminated
- Refresh tokens can no longer be used
- The access token becomes ineffective once expired

This ensures secure session termination, especially on shared or public devices.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


