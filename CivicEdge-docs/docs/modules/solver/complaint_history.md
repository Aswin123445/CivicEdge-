# Complaint History (Solver Module)

The Complaint History submodule allows solvers to review all complaints they’ve handled in the past. This includes resolved, pending, and in-progress complaints, along with any associated media and notes.

---

## ✅ Features

- View list of previously assigned complaints
- Filter by status (Resolved, In Progress, Pending, etc.)
- View complaint details, timeline, and media uploads
- Track own performance history

---

## 🧩 Tables Involved

- `complaints`
- `complaint_status_logs`
- `complaint_media`
- `users` (linked via solver_id)

---

## 🔍 Filtering Options

Solvers can filter complaint history using the following fields:

- **Status**: Resolved, In Progress, Pending
- **Date Range**: (e.g., last 30 days, custom range)
- **Category**: Road, Water, Lighting, etc.
- **Location**: (Optional, if solver handles multiple zones)

---

## 🧭 Navigation Flow

