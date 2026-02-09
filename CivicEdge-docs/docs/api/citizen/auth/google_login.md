# 🌐 Google Login

**Endpoint:** `GET /api/auth/google/login`  
**Auth Required:** ❌ No  

---

## 📌 Description

This endpoint initiates the **Google OAuth authentication flow** for citizens.

When accessed, the user is redirected to Google’s consent screen where they can choose their Google account and grant permission to CivicEdge.

This login method provides a faster onboarding experience and removes the need for manual email verification.

---

## 🔐 Authentication

No authentication is required for this endpoint.

---

## 🔁 OAuth Flow

1. Citizen clicks **“Continue with Google”**
2. Frontend redirects to:
