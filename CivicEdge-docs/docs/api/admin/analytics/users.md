# 👥 User Engagement Analytics

**Endpoint:** `GET /api/admin/analytics/users/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

The **User Engagement Analytics** endpoint provides administrators with insights into how users interact with the CivicEdge platform.

This analytics view helps measure platform adoption, usage patterns, and engagement levels across different user roles.

All metrics are aggregated and privacy-safe.

---

## 🎯 Purpose

- Monitor platform growth
- Track user activity trends
- Measure feature adoption
- Identify engagement drop-offs
- Support product improvement decisions

---

## 📊 Metrics Included

### 👤 User Growth
- Total registered users
- New user registrations
- Registration trends over time

---

### 📈 Active Usage
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Monthly Active Users (MAU)
- User retention indicators

---

### 🧭 Role-Based Distribution
- Citizens count
- Solvers count
- Volunteers count
- Admin count

---

### 🧩 Module Usage
- Complaints module usage
- Forum participation
- Poll voting activity
- Volunteer event participation

---

### ⭐ Feedback & Interaction
- Feedback submissions
- Average feedback rating (if enabled)
- User interaction frequency

---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `date_range` | string | `today`, `7_days`, `30_days`, `custom` |
| `start_date` | date | Required if custom |
| `end_date` | date | Required if custom |
| `role` | string | Filter by user role |
| `zone` | string | Filter by ward or zone |

---

## ✅ Example Request

```http
GET /api/admin/analytics/users/?date_range=30_days
Authorization: Bearer <admin_token>
