# 🔍 Solver Details

**Endpoint:** `GET /api/admin/solvers/{id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to retrieve the **complete profile and operational details of a specific solver**.

It provides visibility into solver identity, availability, workload, assignment history, and performance indicators, enabling informed administrative decisions.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique solver ID |

---

## ✅ Example Request

```http
GET /api/admin/solvers/sol-221/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
