# Complaint Handling (Solver Module)

This module covers how solvers receive, view, update, and resolve complaints assigned by the admin. It includes optional map navigation and progress tracking with media uploads.

---

## ✅ Key Actions for Solvers

1. **Receive Complaints**  
   - Automatically assigned by admin
   - Appear in the solver's dashboard under “Assigned Complaints”

2. **Accept & View Complaint**
   - Click on a complaint to view full details:
     - Title & Description
     - Location (map or address)
     - Media (photos, videos)
     - Category & Urgency

3. **Mark as In Progress**
   - Status changes to `in_progress`
   - Solver can add:
     - Initial comments/notes
     - Start time (auto-captured)
     - Optional ETA

4. **Update Progress**
   - Upload live images or videos
   - Add work logs or tools used
   - Optional: Update location via map

5. **Mark as Resolved**
   - Final status update
   - Upload final media (proof of fix)
   - Add completion notes
   - Automatically sends update to citizen + admin

6. **View Complaint Details Anytime**
   - Timeline of updates
   - Media gallery
   - Admin instructions (if any)

---

## 🗺️ Navigation (Optional Feature)

If navigation is enabled:

- On Complaint Detail Page:
  - Click “Open Map”
  - Launch Google Maps with complaint coordinates
  - Allows real-time route from current location

---

## 🧩 Tables Involved

- `complaints`  
- `complaint_assignments`  
- `complaint_status_logs`  
- `complaint_media`  

---

## 🧪 Status Flow

```text
assigned → in_progress → resolved
