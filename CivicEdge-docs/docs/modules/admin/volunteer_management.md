# 🪖 Volunteer Management (Admin)

The **Volunteer Management Module** enables administrators to oversee all volunteer-related operations within CivicEdge.

This module is designed to promote civic participation while ensuring safety, responsibility, and scalability through a **tier-based volunteer (army) system**.

Admins manage volunteer groups, verify high-responsibility volunteers, organize events, monitor participation, and issue recognition such as badges and certificates.

---

## ✅ Core Responsibilities

Admins can:

- Create and manage volunteer groups (armies)
- Define group type and responsibility tier
- Review and verify volunteer details for high-risk groups
- Create and publish volunteer events
- Monitor event participation and attendance
- Assign tasks to volunteers (optional)
- Issue badges and certificates
- Track volunteer contribution history

---

## 🪖 Tier-Based Volunteer Model

Volunteer groups are categorized into **two tiers** based on responsibility and risk.

### 🟢 Tier 1 — Non-Risk / Public Participation

Examples:
- Cleanliness drives
- Awareness campaigns
- Blood donation support
- Social service activities

**Joining Behavior**
- Citizens can join instantly
- No admin approval required
- Participation allowed immediately

Admin role:
- Create groups
- Create events
- Monitor participation
- Issue recognition

---

### 🔴 Tier 2 — High Responsibility / Risk-Based

Examples:
- Disaster response
- Emergency support
- Night patrol volunteering
- Medical or rescue assistance

**Joining Behavior**
- Requires additional volunteer details
- Join request submitted for admin review
- Admin must approve or reject membership

Admin role:
- Review volunteer information
- Verify documents or details
- Approve or reject join requests
- Grant access to Tier 2 events

---

## 🧩 Key Tables

| Table | Purpose |
|------|---------|
| `volunteer_groups` | Stores volunteer army definitions |
| `volunteer_memberships` | Approved group members |
| `volunteer_join_requests` | Pending Tier 2 join validations |
| `volunteer_events` | Events created under groups |
| `event_participation` | Tracks volunteer participation |
| `volunteer_badges` | Recognition badges |
| `volunteer_certificates` | Certificates issued |

---

## 🔄 Admin Workflow

### 1️⃣ Manage Volunteer Groups
- Create volunteer groups
- Define:
  - group purpose
  - responsibility tier (Tier 1 / Tier 2)
  - verification requirement

---

### 2️⃣ Review Volunteer Join Requests (Tier 2 Only)
- View submitted volunteer information
- Validate suitability
- Approve or reject request
- Convert approved users into active members

---

### 3️⃣ Manage Volunteer Events
- Create events under volunteer groups
- Define:
  - date & location
  - eligibility criteria
  - participation limits
- Publish event notifications

---

### 4️⃣ Approve Event Participation (If Required)
- For sensitive events, admin may:
  - verify participants
  - limit access to verified members only

---

### 5️⃣ Monitor Participation
- Track:
  - registered volunteers
  - attendance
  - completion status
- Maintain contribution logs

---

### 6️⃣ Issue Badges & Certificates
- Issue participation certificates
- Grant badges for repeated or outstanding contributions
- Maintain volunteer recognition history

---

## 🔗 Integrations

- **Notification System**
  - Event announcements
  - Join approval alerts
  - Certificate notifications

- **Authentication Module**
  - Only logged-in users may participate
  - Role-based access enforcement

- **Certificate Module**
  - PDF generation
  - Verification history tracking
  - Future QR validation support

---

## 📈 Future Enhancements

- Auto-certification based on participation logs
- Volunteer reputation or civic score system
- Tier upgrade based on contribution history
- Public volunteer profiles
- QR-verifiable certificates for resumes and LinkedIn
- Analytics by ward, city, and activity type

---

> ℹ️ The tier-based volunteer system ensures inclusive civic participation while maintaining safety, accountability, and long-term scalability.
