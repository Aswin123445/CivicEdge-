# 🛠 Complaint Management (Admin)

The **Complaint Management Module** enables administrators to review, verify, assign, and oversee the resolution of complaints submitted by citizens.

This module acts as the **central coordination layer** between citizens and solvers, ensuring that complaints are processed through inspection, approval, execution, and closure in a transparent and controlled manner.

---

## ✅ Core Responsibilities

- Review new complaints submitted by citizens
- Verify and validate complaints before action
- Assign verified complaints to appropriate solvers
- Review inspection and proposal reports submitted by solvers
- Accept or reject proposed resolutions
- Move complaints to future planning when required
- Monitor execution progress
- Close complaints after successful resolution
- Communicate updates to citizens and solvers

---

## 🧭 Complaint Lifecycle


Admins primarily operate across the **Verified → Closed** stages.

---

## 🧩 Key Tables

- `complaints`
- `complaint_assignments`
- `inspection_reports`
- `complaint_status_logs`
- `complaint_media`
- `complaint_feedback`

---

## 🔄 Admin Workflow

### 1. View Unverified Complaints

- Filter complaints by status: `submitted`
- View full complaint details:
  - Title and description
  - Location and media
  - Citizen information

---

### 2. Verify Complaint

- Mark complaint as `verified`
- Optionally:
  - Reject invalid complaints
  - Merge duplicate complaints

---

### 3. Assign Complaint to Solver

- Select solver based on:
  - Complaint category
  - Geographical zone
  - Current workload (optional)

- Create record in `complaint_assignments`
- Complaint status changes to `assigned`

---

### 4. Review Solver Proposal

After site inspection, solvers submit a report containing:

- On-site findings
- Root cause analysis
- Estimated time for resolution
- Proposed budget
- Suggested service providers (if applicable)

Admin actions:

- Review report details and attached media
- Evaluate feasibility and cost

---

### 5. Accept or Reject Proposal

- **Approve for Execution**
  - Complaint moves to `approved`
  - Solver proceeds with execution and monitoring

- **Move to Future Planning**
  - Used when budget or scope exceeds current limits
  - Complaint marked as `planned`
  - Citizen is notified with remarks

All decisions are logged in `complaint_status_logs`.

---

### 6. Monitor Progress

- View solver progress updates
- Track time taken and delays
- Review media uploaded during execution
- Communicate remarks if required

---

### 7. Close Complaint

- Verify final resolution
- Mark complaint as `closed`
- Notify citizen
- Enable feedback submission

---

## 🧑‍💻 Admin Tools & Interfaces

- **Complaint Queue**
  - Filters by status, category, ward, urgency

- **Solver Assignment Panel**
  - Manual or assisted assignment interface

- **Inspection Review Panel**
  - Review solver inspection and proposal reports

- **Approval & Planning Console**
  - Approve execution
  - Move complaints to future planning with remarks

- **Progress Tracking View**
  - Timeline-based complaint history

- **Feedback Dashboard**
  - View citizen satisfaction ratings and comments

---

## 🔗 Integration Points

- **Solver Module**
  - Inspection submissions
  - Progress and resolution updates

- **Notification System**
  - Citizen status updates
  - Solver assignment alerts
  - Approval and planning notifications

- **Analytics Module**
  - Resolution success rate
  - Average resolution time
  - Category-wise and area-wise insights

---

## 📈 Future Enhancements

- Auto-assignment using category and location
- SLA-based alerts for delayed complaints
- AI-powered duplicate complaint detection
- Escalation workflow for long-pending issues
- Planning backlog analytics

---

> ℹ️ This module ensures complaints are handled responsibly through inspection-based decision-making, administrative approval, and transparent tracking.
