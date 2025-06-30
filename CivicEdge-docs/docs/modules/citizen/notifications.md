# Notification Module

The Notification Module delivers real-time and system-triggered alerts to users across the platform. It ensures key updates (like complaint status changes, event announcements, poll creations) are communicated promptly.

---

## ✅ Core Features

- Role-based notifications (Citizen, Admin, Solver)
- Event-triggered alerts (e.g., complaint assigned, poll created)
- In-app notification center (visible to user)
- Optional: Email or push notification support
- Mark-as-read / seen tracking

---

## 📦 Key Notification Types

| Action/Event                   | Recipient   | Description                                 |
|--------------------------------|-------------|---------------------------------------------|
| Complaint status changed       | Citizen     | "Your complaint has been marked as resolved" |
| Complaint assigned             | Solver      | "New task assigned to you"                  |
| Volunteer event created        | Citizen     | "New cleanup event in your area!"           |
| Poll launched by admin         | Citizen     | "Vote now on the public road planning poll" |
| Forum thread reply             | Citizen     | "Someone replied to your post"              |
| Certificate issued             | Citizen     | "You earned a new certificate!"             |

---

## 🧩 Core Tables

- `notifications`
- `notification_preferences` (optional: mute/email opt-in)
- `notification_status` (per-user read tracking)

---

## 🧭 Notification Flow

1. System triggers an event (e.g., complaint assigned)
2. Notification entry is created in `notifications` table
3. User’s notification center pulls unread messages
4. User marks as read or interacts (e.g., clicks link)

---

## 👥 Role-Specific Use

- **Citizen**: Complaint updates, forum replies, events, certificates
- **Admin**: New complaints, event participation, poll stats
- **Solver**: Task assignments, task reassignments, reminders

---

## 🔗 Integration Points

- **Complaint Module**: Status change triggers
- **Volunteer System**: New events or group approvals
- **Forum**: Replies and mentions
- **Polls**: Poll creation and results push
- **Certificates**: Send notice upon issuance

---

## 💡 Delivery Channels (Planned)

- In-app bell icon Routing to Notification page

---

## 📈 Future Enhancements

- User notification settings (mute or filter by type)
- Admin broadcast messages to all users
- Scheduled notifications
- Expiry time or auto-dismiss logic

