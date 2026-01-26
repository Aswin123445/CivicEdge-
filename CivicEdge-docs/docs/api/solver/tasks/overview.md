# 🛠 Solver Task Management Module Overview

The **Solver Task Management Module** enables field workers (solvers) to manage, inspect, and monitor civic tasks assigned to them. Each task originates from a citizen-submitted complaint and represents a real-world issue that requires on-ground assessment and coordinated resolution.

Solvers are responsible not only for tracking task progress, but also for conducting site visits, preparing inspection reports, and verifying final resolution. This module ensures transparent, traceable, and accountable task handling from assignment to closure.

---

## 🎯 Key Objectives

- Present solvers with a list of assigned civic tasks.
- Enable on-site inspection and report submission.
- Allow solvers to provide estimated budget and resolution timelines.
- Support uploading images/videos as inspection and resolution proof.
- Maintain a complete audit trail of task activity.
- Link tasks back to complaints for transparency and future invoicing.

---

## 🧱 Database Structure (Brief)

| Table | Purpose |
|-------|---------|
| `tasks` | Core task record created from a complaint. |
| `task_assignments` | Tracks solver assignment for each task. |
| `inspection_reports` | Stores site visit findings submitted by solvers. |
| `task_update_submissions` | Stores progress and completion updates. |
| `task_media` | Images/videos uploaded during inspection and resolution. |
| `task_status_logs` | Tracks lifecycle and status transitions. |
| `complaints` | Source civic issue for contextual reference. |

---

## 🔁 High-Level Workflow

1. **Task Assignment**  
   Admin assigns a complaint-based task to a solver.

2. **Site Inspection**  
   Solver visits the location to assess the issue on the ground.

3. **Inspection Report Submission**  
   Solver submits an initial report including:
   - problem assessment  
   - estimated budget  
   - expected resolution timeline  
   - suggested service providers (if applicable)

4. **Admin Review & Decision**  
   Admin reviews the inspection report and may:
   - approve the task for execution  
   - request revisions  
   - move the task to future planning  

5. **Execution Monitoring**  
   Once approved, work is carried out by service providers and monitored by the solver.

6. **Verification & Closure**  
   Solver verifies completion, uploads final proof, and the task is marked resolved.

---

## 📦 Available Endpoints

| Feature | Method | Endpoint |
|--------|--------|----------|
| List Assigned Tasks | `GET` | `/api/solver/tasks/` |
| Task Details | `GET` | `/api/solver/tasks/{id}/` |
| Submit Inspection Report | `POST` | `/api/solver/tasks/{id}/inspection/` |
| Upload Inspection Media | `POST` | `/api/solver/tasks/inspection/{report_id}/media/` |
| Submit Progress / Completion Update | `POST` | `/api/solver/tasks/{id}/update/` |
| View Update History | `GET` | `/api/solver/tasks/{id}/updates/` |

---

## 🔐 Authentication

All endpoints require a **Solver bearer token**.

