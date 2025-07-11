# 🛠 Solver Task Management Module Overview

The **Solver Task Management Module** empowers solvers (field workers) to efficiently manage, update, and close tasks assigned to them. Each task is rooted in a citizen-submitted complaint and represents a real-world civic issue requiring resolution.

Solvers can view their assignments, update status, attach media as proof, and provide resolution notes. This module ensures transparent and traceable action from assignment to closure.

---

## 🎯 Key Objectives

- Present solvers with a list of assigned tasks.
- Enable status updates (`in_progress`, `resolved`).
- Allow image/video uploads as resolution proof.
- Maintain an audit trail of task progress.
- Link updates back to complaints and enable future invoicing.

---

## 🧱 Database Structure (Brief)

| Table | Purpose |
|-------|---------|
| `tasks` | Core task record linked to a complaint. |
| `task_assignments` | Tracks which solver is assigned to each task. |
| `task_update_submissions` | Stores progress/resolution updates from solvers. |
| `task_media` | Media (images/videos) attached by solvers for updates. |
| `complaints` | Source of the issue — used for context. |

---

## 🔁 Workflow

1. **Admin assigns a task** to a solver (`task_assignments`).
2. **Solver retrieves assigned tasks** from their dashboard.
3. **Solver starts work**, marking status as `in_progress`.
4. **Solver resolves the issue**, uploads media, submits notes.
5. **System logs the updates** for visibility and tracking.
6. **Optional: Complaint status auto-updates**, feedback requested.

---

## 📦 Available Endpoints

| Feature | Method | Endpoint |
|--------|--------|----------|
| List Assigned Tasks | `GET` | `/api/solver/tasks/` |
| Task Details | `GET` | `/api/solver/tasks/{id}/` |
| Submit Update | `POST` | `/api/solver/tasks/{id}/update/` |
| Upload Resolution Media | `POST` | `/api/solver/tasks/update/{update_id}/media/` |
| View Task Media | `GET` | `/api/solver/tasks/update/{update_id}/media/` |
| View Update History | `GET` | `/api/solver/tasks/{id}/updates/` |

---

## 🔐 Authentication

All endpoints require a **Solver's bearer token**. Ensure `Authorization: Bearer <token>` is included in request headers.

---

## 🧩 Roles Involved

- **Solver** → Assigned, views, updates, and completes the task.
- **Admin** → Assigns tasks and reviews updates.
- **Citizen** → Receives resolution feedback and views updates via complaint logs.

---

> ℹ️ This module ensures accountability, visual proof of resolution, and enables performance tracking of solvers through structured task updates.
