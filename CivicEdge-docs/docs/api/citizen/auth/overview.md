# 🔐 Authentication Module Overview

The **Authentication Module** manages citizen identity, access, and security within the CivicEdge platform. It enables users to register, verify their identity, securely log in, and manage their accounts using both email-based authentication and Google OAuth.

This module ensures that only authenticated and verified citizens can access protected features such as submitting complaints, participating in discussions, and engaging in civic activities.

---

## 🎯 Key Objectives

- Enable secure citizen registration and login.
- Verify user identity through email confirmation.
- Support Google-based authentication for seamless onboarding.
- Issue and manage access and refresh tokens.
- Protect all citizen-specific APIs through authorization.
- Allow users to manage profile and account details.

---

## 🧱 Database Structure (Brief)

| Table | Purpose |
|-------|---------|
| `users` | Stores authentication credentials and user roles |
| `profiles` | Stores personal and role-specific user information |

---

## 🔁 Workflow

1. **Citizen registers** using email and password.
2. **Verification email is sent** to confirm identity.
3. **User verifies email**, activating the account.
4. **Citizen logs in** and receives JWT access & refresh tokens.
5. **Authenticated requests** are made using access tokens.
6. **Google login users** are auto-verified and onboarded.
7. **Tokens are refreshed** when expired.
8. **Logout invalidates active sessions**.

---

## 📦 Available Endpoints

| Feature | Method | Endpoint |
|--------|--------|----------|
| Register Citizen | `POST` | `/api/auth/register` |
| Verify Email | `POST` | `/api/auth/verify-email` |
| Login | `POST` | `/api/auth/login` |
| Google Login | `GET` | `/api/auth/google/login` |
| Google Callback | `GET` | `/api/auth/google/callback` |
| Refresh Token | `POST` | `/api/auth/refresh` |
| Logout | `POST` | `/api/auth/logout` |
| Forgot Password | `POST` | `/api/auth/forgot-password` |
| Reset Password | `POST` | `/api/auth/reset-password` |
| Get Profile | `GET` | `/api/users/me` |
| Update Profile | `PUT` | `/api/users/me/profile` |

---

## 🔐 Authentication & Authorization

- All protected APIs require a valid **JWT access token**.
- Token must be sent in the request header:

