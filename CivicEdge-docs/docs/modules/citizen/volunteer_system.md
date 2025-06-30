# Volunteer System (Army Module)

This module allows users to join community volunteer groups, participate in events, and build a civic resume. Admins can create events and assign roles to volunteers to help address resource constraints in civic administration.

---

## ✅ Core Features

### For Citizens (Users)
- Browse and join available volunteer groups ("armies")
- Enroll in specific events
- Track participation history
- Earn digital certificates after completing events

### For Admins
- Create and manage volunteer groups
- Create events under each group
- Assign roles to registered volunteers
- Generate certificates of participation or appreciation

---

## 🧩 Database Tables

- `volunteer_groups`  
- `volunteer_memberships`  
- `volunteer_events`  
- `event_participation`  
- `certificates`

---

## 👥 Roles & Permissions

| Role       | Capabilities                                    |
|------------|-------------------------------------------------|
| Citizen    | Join groups, participate in events, earn certs  |
| Admin      | Create/manage groups & events, issue certs      |

---

## 🔄 Module Flow

1. **Join Group**:  
   User browses available volunteer groups and requests to join.

2. **Enroll in Event**:  
   Admin creates events within groups. Users in the group can enroll.

3. **Participation & Verification**:  
   Admin tracks or verifies participation manually or through check-in.

4. **Certification**:  
   After participation, a certificate is issued (downloadable or emailed).

---

## 🎓 Certification System (Planned)

- Each event can be marked as “certifiable”.
- Certificates include:
  - Volunteer name
  - Event name
  - Date
  - Admin signature/seal (predefined)
  - QR code for authenticity
- Stored in `certificates` table and linked to `users`

> Certificates can be exported as PDF for resumes or LinkedIn profiles.

---

## 🔗 Integrations

- **Authentication**: Only verified citizens can join volunteer groups
- **Notification**: Users get notified of new events, confirmations, and certificate availability
- **Admin Dashboard**: Manage groups, attendance, and issue certificates
- **PDF Service**: To render and export digital certificates

---

## 📈 Future Enhancements

- Gamification (points or badges for active volunteers)
- Auto-issued certificates via participation logs
- Integration with LinkedIn’s “Certifications” section
- Geo-tagged event participation history

