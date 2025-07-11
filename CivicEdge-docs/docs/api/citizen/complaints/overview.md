# 🛠 Complaint Module Overview

The **Complaint Module** empowers citizens to report, track, and resolve civic issues in their local communities. It provides a streamlined interface for submitting complaints, attaching media, viewing status updates, and giving feedback upon resolution.

This module serves as the core of civic engagement between citizens, the governing body, and the assigned field workers (solvers).

---

## 🎯 Key Objectives

- Allow users to raise civic issues (e.g., sanitation, water, roads).
- Enable attaching images/videos as proof.
- Track complaint status from creation to resolution.
- Maintain a transparent status log history.
- Collect feedback to evaluate the resolution process.

---

## 🧱 Database Structure (Brief)

| Table | Purpose |
|-------|---------|
| `complaints` | Stores all submitted complaints by users |
| `complaint_media` | Stores image/video evidence linked to complaints |
| `complaint_status_logs` | Tracks status changes and administrative actions |

---

## 🔁 Workflow

1. **Citizen submits a complaint** with optional GPS & media.
2. **Complaint is stored** and marked as `open`.
3. **Admin/Solver updates status** — actions logged in `complaint_status_logs`.
4. **User can view complaint details** and history.
5. **After resolution**, user may provide feedback.

---

## 📦 Available Endpoints

| Feature | Method | Endpoint |
|--------|--------|----------|
| Submit Complaint | `POST` | `/api/complaints/` |
| List User Complaints | `GET` | `/api/complaints/` |
| Complaint Details | `GET` | `/api/complaints/{id}` |
| Update Complaint *(optional)* | `PATCH` | `/api/complaints/{id}` |
| Upload Media | `POST` | `/api/complaints/{id}/media` |
| View Media | `GET` | `/api/complaints/{id}/media` |
| View Status Logs | `GET` | `/api/complaints/{id}/logs` |
| Submit Feedback | `POST` | `/api/complaints/{id}/feedback` |

---

## 🔐 Authentication

All complaint actions require a valid user token. Ensure that your frontend includes the appropriate `Authorization: Bearer <token>` header in API calls.

---

## 🚀 Who Uses This?

- **Citizens** to submit and track complaints.
- **Admins** to view and assign.
- **Solvers** to take action and update status.

---

> ℹ️ This module is designed to scale across cities and can be adapted for mobile and web platforms.

