# 🔐 Admin Authentication Overview

The **Admin Authentication Module** manages secure access for administrators responsible for overseeing civic operations, task coordination, solver management, and platform governance within CivicEdge.

Admins are **privileged users** and cannot self-register. All admin accounts are created and managed exclusively by the **Superuser** to maintain strict control, security, and accountability.

This module ensures that only authorized administrators can access sensitive operational and financial workflows.

---

## 🎯 Key Objectives

- Restrict admin access to authorized personnel only.
- Prevent public or self-initiated admin registration.
- Support secure login using system-issued credentials.
- Enforce password change after first login.
- Provide token-based session management.
- Maintain strong role-based access control.

---

## 👥 Admin Role Definition

Admins are responsible for:

- Managing citizen complaints and assignments.
- Assigning and monitoring solver tasks.
- Reviewing inspection reports and approvals.
- Managing community forums and moderation.
- Overseeing volunteer armies and civic events.
- Reviewing contribution summaries and settlements.

Admins operate at an operational governance level and have broader permissions than solvers or citizens.

---

## 🔑 Account Creation & Role Control

Admin accounts can be created in two ways:

### 1️⃣ Created by Superuser
- Superuser creates admin credentials.
- Temporary password is issued.
- Admin must change password after first login.

### 2️⃣ Promotion from Solver
- Existing solver account is promoted to admin.
- User ID and history are preserved.
- Role is upgraded without creating a new account.

This approach ensures continuity, traceability, and realistic administrative progression.

---

## 🔐 Authentication Model

- Admin authentication uses **JWT-based access and refresh tokens**.
- Login is credential-based only.
- Social login and public registration are not supported.
- All admin APIs are protected using role-based authorization.

---

## 🧩 Supported Actions

- Admin login
- Refresh access tokens
- Secure logout
- Change password

---

## 🔐 Security Rules

- ❌ No public admin registration
- ❌ No Google or social authentication
- ❌ Admins cannot create other admins
- ✅ Only Superuser can create or promote admins
- ✅ Mandatory password update on first login
- ✅ Role-restricted API access

---

## 📦 Available Endpoints

| Feature | Method | Endpoint |
|--------|--------|----------|
| Admin Login | `POST` | `/api/admin/auth/login` |
| Refresh Token | `POST` | `/api/admin/auth/refresh` |
| Logout | `POST` | `/api/admin/auth/logout` |
| Change Password | `POST` | `/api/admin/auth/change-password` |

---

## 🧠 Role Hierarchy

