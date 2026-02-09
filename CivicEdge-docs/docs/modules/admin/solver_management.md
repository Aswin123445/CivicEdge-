# Solver Management

The Solver Management module enables the admin to manage civic workers ("solvers") who are responsible for resolving complaints assigned to them.

---

## ✅ Core Capabilities for Admin

- Add or register new solvers
- View all solvers with status indicators (active, blocked, busy)
- Track availability and workload
- Assign complaints/tasks to solvers
- Reassign or escalate tasks if needed
- View performance metrics
- Initiate payments or rewards
- Block/unblock solver accounts

---

## 🧩 Key Tables

- `solvers`
- `solver_profiles`
- `complaint_assignments`
- `solver_payments` *(optional, if integrated)*
- `solver_performance_logs`
- `blocked_users` *(generic or solver-specific)*

---

## 🔄 Management Workflow

### ➕ Add Solver


### 🔎 Track Solver Availability

- Display solver list with:
  - Current assignment count
  - Last active time
  - Location/zone (if applicable)

### 📥 Assign Tasks


- Optionally filtered by:
  - Location
  - Category specialization
  - Availability status

### ♻️ Reassign or Escalate Task

- Reassign if complaint not acted on within defined SLA
- Escalate to admin-level solver (optional role)

### ⛔ Block / Unblock Solver


- Admin can unblock if needed
- Blocked solvers cannot log in or receive assignments

### 📊 Track Performance

Metrics shown per solver:
- Number of complaints resolved
- Average resolution time
- Citizen feedback/rating (from complaint module)
- Missed deadlines or SLA violations

### 💰 Initiate Payment / Reward (Optional)


- Triggered monthly or per-task basis
- Stored in `solver_payments`

---

## 🔗 Integrations

- **Complaint Module**: For task assignments and updates
- **Notification Module**: For task alerts and reassignment notices
- **Analytics Module**: For performance reporting
- **Reward Distribution**: If tied to top performers
- **Authentication**: Solvers are a user type with distinct role

---

## 🧠 Future Enhancements

- Geo-based solver assignment automation
- Real-time location tracking during work hours
- Smart workload balancing using AI
- Direct messaging between admin and solver
