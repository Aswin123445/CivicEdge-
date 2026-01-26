# 🧑‍🔧 Solver Management Overview

The **Solver Management Module** enables administrators to manage civic field workers (“solvers”) responsible for inspecting, monitoring, and resolving citizen complaints.

This module focuses on **solver lifecycle control, availability tracking, workload management, and performance monitoring**, ensuring that complaints are handled by the right personnel at the right time.

Solver Management does **not** handle financial transactions or settlements.  
All payment-related logic is managed separately under the **Solver Settlement Module**.

---

## 🎯 Key Objectives

- Register and manage solver accounts
- Control solver activation and availability
- Assign and reassign complaints
- Monitor solver workload
- Track performance and accountability
- Enforce disciplinary actions through blocking

---

## 👥 Who Are Solvers?

Solvers are verified civic workers responsible for:

- Conducting site inspections
- Submitting inspection reports
- Monitoring approved executions
- Uploading progress and resolution proof

They act as the operational arm of CivicEdge.

---

## 🧭 Solver Lifecycle


---

## 🧩 Key Tables

- `users` (role = solver)
- `solver_profiles`
- `complaint_assignments`
- `solver_performance_logs`
- `blocked_users`

---

## 🔄 Administrative Workflow

### 1. Create Solver
- Admin registers solver account
- Temporary credentials are issued
- Solver must change password on first login

---

### 2. Activate / Deactivate Solver
- Active solvers can receive assignments
- Deactivated solvers remain in system but receive no new work

---

### 3. Assign Complaints
- Assign based on:
  - location/zone
  - category specialization
  - current workload

---

### 4. Monitor Workload
- View number of active complaints
- Identify overloaded or idle solvers
- Support balanced task distribution

---

### 5. Track Performance
- Complaints resolved
- Average resolution time
- SLA adherence
- Citizen feedback ratings

---

### 6. Block / Unblock Solver
- Blocked solvers:
  - cannot log in
  - cannot receive assignments
- Used for misconduct or repeated SLA violations

---

## 🧑‍💻 Admin Interfaces

- **Solver Directory**
  - List and filter solvers

- **Solver Profile View**
  - Assignment history
  - Performance summary

- **Workload Dashboard**
  - Active vs completed tasks

- **Control Actions**
  - Activate / deactivate
  - Block / unblock

---

## 🔗 Integration Points

- **Complaint Module**
  - Assignment and execution tracking

- **Authentication Module**
  - Role-based access control

- **Analytics Module**
  - Performance insights

- **Settlement Module (Future)**
  - Uses performance data for payment processing

---

## 📈 Future Enhancements

- Geo-based solver allocation
- Smart workload balancing
- Availability scheduling
- Real-time activity indicators
- Role-based senior solvers (lead solvers)

---

> ℹ️ Solver Management ensures operational efficiency, accountability, and fair workload distribution across civic field workers.
