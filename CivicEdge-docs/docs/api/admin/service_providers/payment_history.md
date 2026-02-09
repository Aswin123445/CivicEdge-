# 📄 Provider Payment History

**Endpoint:** `GET /api/admin/service-providers/{provider_id}/payments/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **view the complete payment history of a service provider**.

It provides a transparent record of all settlements made to the provider for auditing, financial tracking, and administrative review.

This endpoint is strictly read-only.

---

## 🎯 Purpose

- Track total payments made to a provider
- Support financial auditing
- Review settlement timelines
- Maintain long-term expenditure history

---

## 🔐 Authentication

Include a valid admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider_id` | UUID | ✅ | Service provider ID |

---

## 🔍 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `from_date` | date | Filter payments from date |
| `to_date` | date | Filter payments up to date |
| `page` | integer | Page number |
| `limit` | integer | Records per page |

---

## ✅ Example Request

```http
GET /api/admin/service-providers/sp-1021/payments/
Authorization: Bearer <admin_token>
