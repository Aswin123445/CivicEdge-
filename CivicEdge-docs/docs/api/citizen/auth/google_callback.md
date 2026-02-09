# 🔁 Google Authentication Callback

**Endpoint:** `GET /api/auth/google/callback`  
**Auth Required:** ❌ No  

---

## 📌 Description

This endpoint handles the **callback response from Google OAuth** after a citizen successfully authenticates using their Google account.

Google redirects the user to this endpoint with an authorization code, which is then exchanged for user profile information.

Based on the received data, CivicEdge either:
- logs in an existing citizen, or
- automatically registers a new citizen account

---

## 🔐 Authentication

No authentication is required for this endpoint.

---

## 🔁 OAuth Callback Flow

1. Google redirects the user to:
