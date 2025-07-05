# Complaint Management (Admin)

The Complaint Management module allows admins to review, verify, assign, and track the resolution of complaints submitted by citizens. It serves as the central point of coordination between users and solvers.

---

## ✅ Core Responsibilities

- View and verify new complaints submitted by citizens
- Assign verified complaints to appropriate solvers
- Monitor the progress of complaints
- Close or escalate complaints as needed
- Communicate with citizens and solvers if required

---

## 🧭 Complaint Lifecycle


Admins interact primarily with the **Verified → Closed** stages.

---

## 🧩 Key Tables

- `complaints`
- `complaint_assignments`
- `complaint_status_logs`
- `complaint_media`
- `complaint_feedback`

---

## 🔄 Admin Flow

### 1. View Unverified Complaints

- Filter by status: "Submitted"
- View complaint details: title, description, location, media, citizen info

### 2. Verify & Accept Complaint

- Mark complaint as "Verified"
- Optionally reject or merge duplicates

### 3. Assign to Solver

- Choose solver based on:
  - Complaint category
  - Geographical location
  - Solver workload (optional)

- Create an entry in `complaint_assignments`

### 4. Monitor Progress

- Status updates from solver are logged in `complaint_status_logs`
- Admin can view:
  - Time taken
  - Media proofs
  - Comments from solver

### 5. Close Complaint

- Admin verifies resolution
- Marks complaint as "Closed"
- Citizen is notified and prompted for feedback

---

## 🧑‍💻 Admin Tools/Interfaces

- **Complaint Queue View**: Filter by status, category, area
- **Assignment Panel**: Map-based or dropdown solver selector
- **Tracking View**: Timeline/log of all complaint status changes
- **Resolution Confirmation**: Button to close after validation
- **Feedback View**: See user satisfaction scores/comments

---

## 🔗 Integration Points

- **Solver Dashboard**: Assignments and updates come from here
- **Notification System**: Auto-alerts to solvers and citizens
- **Analytics**: Complaint resolution rates, avg. resolution time, category heatmap

---

## 📈 Future Enhancements

- Auto-assign based on category & location
- SLA-based resolution timers and reminders
- AI-based duplicate complaint detection
- Escalation system for long-unresolved complaints

