# 🧾 Complaint Analytics

**Endpoint:** `GET /api/admin/analytics/complaints/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

The **Complaint Analytics** endpoint provides administrators with detailed insights into civic complaints submitted on the platform.

This data helps identify problem areas, measure service efficiency, and support data-driven urban planning.

All analytics are aggregated and do not expose individual citizen data.

---

## 🎯 Purpose

- Monitor complaint volume and trends
- Identify high-impact problem categories
- Evaluate resolution efficiency
- Detect zone-wise civic issues
- Support infrastructure planning

---

## 📊 Metrics Included

### 📈 Complaint Volume
- Total complaints
- Complaints submitted over time
- Daily / weekly / monthly trends

---

### 🧭 Category Distribution
- Complaints by category (roads, water, sanitation, etc.)
- Percentage contribution per category

---

### 📍 Zone / Ward Analysis
- Complaints by ward or zone
- High-density complaint areas
- Heatmap-ready data

---

### ⏱ Resolution Metrics
- Resolution rate
- Average resolution time
- Pending vs resolved ratio
- Long-running complaints

---

### 🚨 Status Breakdown
- Open
- Verified
- In-progress
- Resolved
- Closed

---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `date_range` | string | `today`, `7_days`, `30_days`, `custom` |
| `start_date` | date | Required if custom |
| `end_date` | date | Required if custom |
| `zone` | string | Filter by ward or zone |
| `category` | string | Filter by complaint category |

---

## ✅ Example Request

```http
GET /api/admin/analytics/complaints/?date_range=30_days
Authorization: Bearer <admin_token>
