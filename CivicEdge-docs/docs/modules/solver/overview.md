# 🛠 Solver Task Management Module

The **Solver Task Management Module** enables field workers (solvers) to manage, inspect, and coordinate resolution of civic issues assigned to them.

Each task originates from a citizen-submitted complaint and follows a structured real-world resolution process involving site inspection, reporting, administrative approval, and service provider execution.

This module ensures accountability, traceability, and transparency throughout the lifecycle of a civic issue.

---

## 🎯 Key Objectives

- Provide solvers with a clear list of assigned civic tasks.
- Enable on-site inspection and report submission.
- Allow solvers to recommend service providers and estimated costs.
- Facilitate admin review and approval of proposed solutions.
- Track execution progress and final verification.
- Maintain a complete audit trail from inspection to closure.

---

## 🧱 Database Structure (Updated)

| Table | Purpose |
|------|---------|
| `tasks` | Core task created from a complaint |
| `task_assignments` | Tracks solver assigned to each task |
| `inspection_reports` | Site visit findings submitted by solver |
| `service_provider_proposals` | Suggested vendors and estimated costs |
| `task_status_logs` | Status changes throughout lifecycle |
| `task_media` | Images/videos uploaded during inspection and resolution |
| `complaints` | Source civic issue for contextual reference |

---

## 🔁 Workflow

1. **Task Assignment**  
   Admin assigns a complaint to a solver, creating a task.

2. **Site Inspection**  
   Solver visits the location and conducts a physical inspection.

3. **Inspection Report Submission**  
   Solver submits:
   - issue assessment
   - severity
   - recommended resolution approach
   - supporting images/videos

4. **Service Provider Proposal**  
   Solver suggests one or more service providers with:
   - estimated cost
   - materials required
   - expected resolution timeline

5. **Admin Review & Approval**  
   Admin reviews the report and proposal:
   - approves
   - requests revision
   - or rejects proposal

6. **Execution Phase**  
   Approved service providers carry out the work.

7. **Completion Verification**  
   Solver verifies on-site completion and uploads final proof.

8. **Task Closure**  
   Task and complaint status updated to `resolved`.
   Citizen is notified and feedback is enabled.

---

## 📦 Available Endpoints (Solver)

| Feature | Method | Endpoint |
|------|--------|----------|
| List Assigned Tasks | GET | `/api/solver/tasks/` |
| Task Details | GET | `/api/solver/tasks/{id}/` |
| Submit Inspection Report | POST | `/api/solver/tasks/{id}/inspection/` |
| Upload Inspection Media | POST | `/api/solver/tasks/inspection/{report_id}/media/` |
| Submit Service Provider Proposal | POST | `/api/solver/tasks/{id}/proposal/` |
| View Task Status Timeline | GET | `/api/solver/tasks/{id}/logs/` |
| Submit Completion Verification | POST | `/api/solver/tasks/{id}/verify/` |

---

## 🔐 Authentication

All endpoints require a **Solver access token**.
