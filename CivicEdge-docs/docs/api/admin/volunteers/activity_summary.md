# 📊 Volunteer Activity Summary

**Endpoint:** `GET /api/admin/volunteers/activity-summary/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve a **comprehensive summary of volunteer activity** across all volunteer groups and events.

It provides aggregated insights into participation levels, event engagement, and overall civic contribution, helping admins evaluate the effectiveness of volunteer programs.

This endpoint is primarily used for dashboards, reporting, and decision-making.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `group_id` | UUID | Filter summary by volunteer group |
| `date_from` | date | Start date for analysis |
| `date_to` | date | End date for analysis |
| `tier` | string | `tier1` or `tier2` |

---

## ✅ Example Request

```http
GET /api/admin/volunteers/activity-summary/?tier=tier1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
