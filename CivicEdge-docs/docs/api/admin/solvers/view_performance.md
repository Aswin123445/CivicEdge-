# 📈 View Solver Performance

**Endpoint:** `GET /api/admin/solvers/{id}/performance/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to view the **performance metrics of a solver** based on their historical activity and complaint resolution records.

Performance data is used for:
- operational evaluation
- identifying top performers
- detecting SLA violations
- future reward or settlement calculations
- administrative decision-making

This endpoint provides **aggregated insights**, not raw logs.

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
GET /api/admin/solvers/sol-221/performance/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
