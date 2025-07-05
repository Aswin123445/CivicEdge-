# 📢 Notification Broadcasts (Admin)

This module allows admins to send announcements and alerts to specific user groups across the Smart City Citizen Dashboard. Broadcasts are used to notify citizens, solvers, or volunteers about important civic events, updates, or system-wide changes.

---

## ✅ Key Features

- Create and send new announcements
- Target specific audiences:
  - All users
  - Role-based (e.g., only solvers, only citizens)
  - Zone/ward-based targeting
- Schedule broadcasts for future delivery
- View history of sent announcements

---

## 📦 Involved Tables

- `notifications`
- `broadcast_targets`
- `scheduled_notifications` (optional for future)

---

## 👤 Roles Involved

| Role    | Permission         |
|---------|--------------------|
| Admin   | Full broadcast control |
| Citizen | Receive broadcasts |
| Solver  | Receive broadcasts |
| Volunteer | Receive broadcasts |

---



---

## 🧩 Common Use Cases

- Alert users about road work in a specific area
- Invite volunteers to a new campaign
- Share poll links or voting deadlines
- Notify citizens of system downtime or new features

---

## 📈 Future Enhancements

- Email/SMS broadcast integration
- Markdown or rich-text support for message formatting
- Broadcast templates for reuse
- Analytics: Open rate, click rate (if interactive)

---

## 🔗 Related Modules

- [Notification Management](notification_management.md)
- [Volunteer Management](volunteer_management.md)
- [Poll Management](poll_management.md)
