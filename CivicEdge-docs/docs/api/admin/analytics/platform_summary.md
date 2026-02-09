# 📌 Platform Summary Analytics

**Endpoint:** `GET /api/admin/analytics/summary/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

The **Platform Summary Analytics** endpoint provides administrators with a **high-level snapshot of the entire CivicEdge platform**.

This summary acts as the **default dashboard view**, allowing admins to quickly understand system health, civic activity, and participation trends at a glance.

It aggregates key metrics from multiple modules into a single response.

---

## 🎯 Purpose

- Provide a quick overview of platform performance
- Highlight key civic activity indicators
- Support daily administrative monitoring
- Enable leadership-level decision making

---

## 📊 Metrics Included

### 🧾 Complaint Overview
- Total complaints
- Open complaints
- In-progress complaints
- Resolved complaints
- Average resolution time

---

### 🧑‍🔧 Solver Overview
- Total active solvers
- Tasks assigned today
- Tasks completed today
- Pending or overdue tasks

---

### 🤝 Volunteer Overview
- Total volunteer groups
- Active volunteers
- Ongoing events
- Participation count

---

### 💬 Community Overview
- Active forum threads
- Comments posted today
- Reported content count
- Polls currently active

---

### 👥 User Overview
- Total registered users
- New registrations (today / week)
- Daily active users
- Weekly active users

---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `date_range` | string | `today`, `7_days`, `30_days`, `custom` |
| `zone` | string | Filter by ward or zone |

---

## ✅ Example Request

```http
GET /api/admin/analytics/summary/?date_range=7_days
Authorization: Bearer <admin_token>
