# 💬 Community Engagement Analytics

**Endpoint:** `GET /api/admin/analytics/community/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

The **Community Engagement Analytics** endpoint provides administrators with insights into citizen participation across community-driven modules such as forums and polls.

This analytics view helps measure civic awareness, discussion quality, and public involvement in governance processes.

All metrics are aggregated and privacy-safe.

---

## 🎯 Purpose

- Measure civic participation levels
- Track forum activity and discussion trends
- Monitor content moderation workload
- Evaluate poll engagement effectiveness
- Understand community sentiment indirectly

---

## 📊 Metrics Included

### 🧵 Forum Activity
- Total forum threads
- Total comments
- Threads created over time
- Comments per thread ratio

---

### 🚩 Moderation Insights
- Reported posts or comments
- Moderation actions taken
- Most reported categories
- Resolution time for reports

---

### 🗳️ Poll Participation
- Total polls created
- Active polls
- Average participation rate
- Voting trends over time

---

### 📈 Engagement Trends
- Daily / weekly forum activity
- Discussion growth patterns
- Peak engagement times

---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `date_range` | string | `today`, `7_days`, `30_days`, `custom` |
| `start_date` | date | Required if custom |
| `end_date` | date | Required if custom |
| `zone` | string | Filter by ward or zone |
| `module` | string | `forum`, `polls`, or `all` |

---

## ✅ Example Request

```http
GET /api/admin/analytics/community/?date_range=7_days
Authorization: Bearer <admin_token>
