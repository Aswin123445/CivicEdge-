# 🛡️ Admin Complaint Module Overview

The **Admin Complaint Module** enables administrators to supervise, manage, and resolve civic complaints efficiently. This module acts as the bridge between citizens who report issues and solvers who take action, ensuring a transparent, traceable workflow.

Admins can assign solvers, track complaint progress, moderate content, and communicate directly with stakeholders — ensuring accountability across the complaint lifecycle.

---

## 🎯 Key Objectives

- View and filter all submitted complaints.
- Assign solvers to unresolved complaints.
- Track and update complaint status manually.
- Monitor media and log history.
- Remove spam/inappropriate complaints.
- Notify citizens about status or required actions.

---

## 🧱 Database Structure (Brief)

| Table | Purpose |
|-------|---------|
| `complaints` | Stores citizen-submitted complaints |
| `tasks` | Stores solver assignments for each complaint |
| `complaint_status_logs` | Logs all status updates by admins or solvers |
| `complaint_media` | Holds image/video evidence uploaded by citizens or solvers |
| `notifications` | Stores admin-to-citizen notifications related to complaints |

---

## 🔁 Workflow

1. **Admin reviews new complaints** (filtered by category, area, priority).
2. **Assigns complaint** to one or more solvers via task creation.
3. **Monitors progress** using real-time logs and media uploads.
4. **Updates status** (e.g., resolved, escalated, rejected).
5. **Notifies citizen** or requests additional input.
6. **Closes or deletes complaint** based on resolution or verification.

---

## 📦 Available Endpoints

| Feature | Method | Endpoint |
|--------|--------|----------|
| List All Complaints | `GET` | `/api/admin/complaints/` |
| View Complaint Details | `GET` | `/api/admin/complaints/{id}/` |
| Assign Solver | `POST` | `/api/admin/complaints/{id}/assign/` |
| Update Status | `PATCH` | `/api/admin/complaints/{id}/status/` |
| View Status Logs | `GET` | `/api/admin/complaints/{id}/logs/` |
| View Media | `GET` | `/api/admin/complaints/{id}/media/` |
| Delete Complaint | `DELETE` | `/api/admin/complaints/{id}/` |
| Send Notification | `POST` | `/api/admin/complaints/{id}/notify/` |

---

## 🔐 Authentication & Roles

These endpoints are restricted to users with an **Admin** role. Authentication must be done using a valid admin bearer token:

