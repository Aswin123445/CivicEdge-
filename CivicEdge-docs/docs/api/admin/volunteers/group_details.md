# 🔍 Volunteer Group Details

**Endpoint:** `GET /api/admin/volunteers/groups/{id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve the **complete details of a specific volunteer group (army)**.

It provides insight into the group’s purpose, tier, participation level, and operational status, helping admins manage events, validate members, and monitor engagement.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique volunteer group ID |

---

## ✅ Example Request

```http
GET /api/admin/volunteers/groups/vg-102/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
