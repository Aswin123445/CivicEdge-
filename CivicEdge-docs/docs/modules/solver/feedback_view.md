# Feedback View (Solver Module)

This module allows solvers to view feedback submitted by citizens after a complaint is marked as "Resolved". Feedback includes ratings and optional comments, which help track performance and gather appreciation or criticism.

---

## ✅ Key Features

- View feedback for resolved complaints
- Filter feedback by date or rating
- Display user comments (if provided)
- View complaint ID or summary alongside the feedback
- Read-only view for solvers (no editing/deleting)

---

## 🧩 Database Tables

- `complaints`  
- `complaint_feedback`

> Feedback is linked to a `complaint_id`, which in turn is tied to a `solver_id`.

---

## 🔁 Feedback Viewing Flow

