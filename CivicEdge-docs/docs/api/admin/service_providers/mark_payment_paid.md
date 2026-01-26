# 💰 Mark Provider Payment as Paid

**Endpoint:** `POST /api/admin/service-providers/{provider_id}/payments/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **record a payment settlement** made to a service provider.

⚠️ This API does **not perform real-money transactions**.  
It only records that payment has been completed **outside the system** for auditing and tracking purposes.

---

## 🎯 Purpose

- Maintain transparent payment records
- Track civic expenditure
- Support auditing and financial reporting
- Avoid direct financial gateway complexity

---

## 🔐 Authentication

Include a valid admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider_id` | UUID | ✅ | Service provider ID |

---

## 🧾 Request Body

```json
{
  "amount": 45000,
  "payment_date": "2026-03-09",
  "payment_reference": "NEFT-982341",
  "remarks": "Road repair work settlement for Ward 7"
}
