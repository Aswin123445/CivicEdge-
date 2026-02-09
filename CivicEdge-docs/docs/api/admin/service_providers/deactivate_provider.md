# ⛔ Deactivate Service Provider

**Endpoint:** `POST /api/admin/service-providers/{provider_id}/deactivate/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **deactivate an active service provider**.

Deactivated providers are temporarily disabled and will no longer be available for selection in civic operations or payment processing, while their historical records remain intact for auditing.

---

## 🎯 Purpose

- Temporarily suspend a service provider
- Prevent further engagement without deleting records
- Maintain provider history for governance and audits

---

## 🔐 Authentication

Include a valid admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider_id` | UUID | ✅ | Unique service provider ID |

---

## 🧾 Request Body (Optional)

```json
{
  "reason": "Contract period completed"
}
