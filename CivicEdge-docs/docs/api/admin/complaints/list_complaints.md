# 📋 List Complaints

**Endpoint:** `GET /api/admin/complaints/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve a **list of complaints** submitted by citizens.

Admins can filter complaints based on status, category, priority, location, or date range to efficiently manage the complaint review and resolution process.

This serves as the primary complaint queue for administrative operations.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by complaint status (`submitted`, `verified`, `assigned`, `approved`, `planned`, `closed`) |
| `category` | string | Filter by complaint category |
| `zone` | string | Filter by geographical zone |
| `priority` | string | Filter by priority level |
| `from_date` | date | Filter complaints created after this date |
| `to_date` | date | Filter complaints created before this date |
| `search` | string | Search by title or description |
| `page` | integer | Page number |
| `limit` | integer | Number of records per page |

---

## ✅ Example Request

```http
GET /api/admin/complaints/?status=submitted&category=sanitation&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
