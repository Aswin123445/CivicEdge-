# 📋 List Service Providers

**Endpoint:** `GET /api/admin/service-providers/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view and manage all registered service providers** in the CivicEdge platform.

It supports filtering and searching to help admins quickly identify providers based on service type, operational zone, or status.

---

## 🎯 Purpose

- View the complete provider registry
- Monitor active and inactive providers
- Filter providers by service category or zone
- Support administrative decision-making

---

## 🔐 Authentication

Include a valid admin access token in the request header:


---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `active` / `inactive` |
| `category` | string | Filter by service category |
| `zone` | string | Filter by operational ward/zone |
| `search` | string | Search by provider name |

---

## ✅ Example Request

```http
GET /api/admin/service-providers/?status=active&category=Waste
Authorization: Bearer <admin_token>
