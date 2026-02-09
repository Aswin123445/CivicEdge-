# User Management (Admin Module)

This module allows administrators to view, manage, and take actions on platform users (citizens, solvers, and other admins). It provides tools to ensure responsible usage and maintain platform safety.

---

## ✅ Core Features

- View full list of registered users
- Filter/search users by:
  - Name
  - Email
  - Role (citizen, solver, admin)
  - Zone - (Area/ward)
- View user profile and activity
- Block or unblock users
- Promote or demote users (e.g., to solver or moderator)
- Issue warnings
- Track user activity (complaints submitted, forum posts, events joined)

---

## 🧩 Key Tables

- `users`
- `user_profiles`
- `user_roles`
- `user_activity_logs`
- `user_warnings` (optional)

---

## 🔄 Admin Flow


---

## 👥 Role Management Examples

- **Citizen → Solver**: Promote a highly active user to assist with complaint resolution.
- **Solver → Citizen**: Revoke solver rights if inactive or misused.
- **Assign Moderator Role**: For active forum users to assist with post moderation.

---

## 🔗 Dependencies

- **Authentication**: Role-checking logic
- **Complaint System**: Pulls activity stats (e.g., complaints filed)
- **Volunteer System**: Shows participation history
- **Forum Module**: Highlights content contributions or flags

---

## 📈 Future Enhancements

- Bulk user management actions
- Soft-delete and audit logs
- Role-based access control (RBAC) UI
- Email notifications on role changes or warnings
