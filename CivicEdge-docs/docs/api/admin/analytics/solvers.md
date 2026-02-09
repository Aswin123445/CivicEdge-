# 🧑‍🔧 Solver Performance Analytics

**Endpoint:** `GET /api/admin/analytics/solvers/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

The **Solver Performance Analytics** endpoint provides administrators with detailed insights into the efficiency, workload, and performance of solvers (field workers).

This analytics view helps evaluate operational effectiveness, identify top performers, detect delays, and support fair workload distribution and compensation planning.

All data is aggregated and does not expose sensitive solver information.

---

## 🎯 Purpose

- Measure solver productivity
- Track task completion efficiency
- Identify overloaded or underutilized solvers
- Support performance-based evaluation
- Improve task assignment strategies

---

## 📊 Metrics Included

### 📋 Task Overview
- Total tasks assigned
- Tasks completed
- Tasks in progress
- Overdue tasks

---

### ⏱ Performance Metrics
- Average resolution time per solver
- On-time completion rate
- Delay frequency

---

### 🏆 Top Performers
- Solvers with highest completion count
- Solvers with fastest average resolution
- Solvers with highest citizen feedback ratings (if enabled)

---

### ⚠️ Workload Distribution
- Active tasks per solver
- Average workload per solver
- High-load vs low-load indicators

---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `date_range` | string | `today`, `7_days`, `30_days`, `custom` |
| `start_date` | date | Required if custom |
| `end_date` | date | Required if custom |
| `zone` | string | Filter by solver zone |
| `solver_id` | UUID | View specific solver metrics |

---

## ✅ Example Request

```http
GET /api/admin/analytics/solvers/?date_range=30_days
Authorization: Bearer <admin_token>
