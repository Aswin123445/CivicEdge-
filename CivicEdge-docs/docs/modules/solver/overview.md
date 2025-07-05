# Solver Module Overview

The Solver module enables civic workers to manage their assigned complaints, mark progress, upload proof of resolution, and receive citizen feedback. It also supports optional location-based navigation.

---

## 🔁 Core Solver Workflows

| Flow                      | Description                                     |
|---------------------------|-------------------------------------------------|
| **Login & Dashboard**     | Login and see stats (assigned, resolved, etc.) |
| **View Complaints**       | List + detail view of assigned complaints      |
| **Update Complaint**      | Mark status, upload images, notes              |
| **View History**          | Check past complaints and resolution logs      |
| **Receive Feedback**      | View citizen ratings and comments              |
| **Manage Profile**        | Update own info (zone, skills, photo, etc.)    |
| **Notifications**         | See new task assignments and admin messages    |
| **Navigation Assistance** | (Optional) Use map for complaint directions    |

---

## 📂 Submodules

- `complaint_handling.md` – View, update, resolve complaints
- `complaint_history.md` – List and view past tasks
- `feedback_view.md` – Read user feedback after resolution
- `profile_management.md` – Edit solver profile and settings
- `notifications.md` – View system and admin alerts
- `navigation_assistance.md` – Launch Google Maps to complaint site (optional)

---

## 🔐 Access & Permissions

Solvers must log in with solver credentials and can only:

- View complaints assigned to them
- Mark/update only their assigned complaints
- View only their feedback, history, and notifications

---

## 🔗 Related Modules

- **Complaint System** – Assignment and tracking
- **Notification Module** – Task updates, alerts
- **Admin Dashboard** – Admin assigns complaints
