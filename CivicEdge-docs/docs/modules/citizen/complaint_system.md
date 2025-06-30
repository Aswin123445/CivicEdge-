# Complaint System

The Complaint System allows citizens to report civic issues (e.g., potholes, waste, lights), track their progress, and enables admins and solvers to resolve them efficiently.

---

## ✅ Core Flow

1. **Citizen** submits a complaint with:
   - Title and description
   - Location (lat/long or address)
   - Media (images/videos)
   - Category (e.g., Roads, Water, Health)

2. **Admin** reviews and verifies:
   - Ensures complaint is valid (not spam or duplicate)
   - Assigns it to a solver based on location/category

3. **Solver** receives the task:
   - Views complaint details
   - Marks progress (in-progress, resolved)
   - Optionally uploads before/after images or comments

4. **Citizen** gets updates and can rate the resolution.

---

## 🧩 Core Tables

- `complaints`  
- `complaint_media`  
- `complaint_assignments`  
- `complaint_status_logs`  
- `complaint_feedback`

---

## 🧭 Status Lifecycle

```text
Submitted → Verified → Assigned → In Progress → Resolved → Closed
