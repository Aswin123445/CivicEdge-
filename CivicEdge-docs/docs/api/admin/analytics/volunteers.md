# 🤝 Volunteer Participation Analytics

**Endpoint:** `GET /api/admin/analytics/volunteers/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

The **Volunteer Participation Analytics** endpoint provides administrators with insights into volunteer engagement across civic programs, community events, and service initiatives.

This analytics view helps evaluate community involvement, event effectiveness, and volunteer contribution trends.

All data is aggregated and privacy-safe.

---

## 🎯 Purpose

- Measure volunteer participation levels
- Track engagement across volunteer groups (armies)
- Evaluate event turnout and impact
- Identify highly active volunteers and groups
- Support recognition and reward planning

---

## 📊 Metrics Included

### 👥 Volunteer Overview
- Total registered volunteers
- Active volunteers
- Inactive volunteers
- New volunteer enrollments

---

### 🧑‍🤝‍🧑 Group (Army) Engagement
- Total volunteer groups
- Members per group
- Most active groups
- Group-wise participation trends

---

### 📅 Event Participation
- Total events conducted
- Ongoing events
- Event attendance rate
- Average participation per event

---

### 🎓 Recognition Metrics
- Certificates issued
- Badges awarded
- Repeat participation count

---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `date_range` | string | `today`, `7_days`, `30_days`, `custom` |
| `start_date` | date | Required if custom |
| `end_date` | date | Required if custom |
| `group_id` | UUID | Filter by volunteer group |
| `zone` | string | Filter by ward or zone |

---

## ✅ Example Request

```http
GET /api/admin/analytics/volunteers/?date_range=30_days
Authorization: Bearer <admin_token>
