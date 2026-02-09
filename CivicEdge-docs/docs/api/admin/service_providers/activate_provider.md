# ✅ Activate Service Provider

**Endpoint:** `POST /api/admin/service-providers/{provider_id}/activate/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **activate a registered service provider**.

Only active providers are eligible to be selected for civic operations and payment processing. Activation confirms that the provider is approved for engagement by the administration.

---

## 🎯 Purpose

- Enable approved service providers
- Control provider availability
- Prevent unauthorized or unverified providers from being used

---

## 🔐 Authentication

Include a valid admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider_id` | UUID | ✅ | Unique service provider ID |

---

## ✅ Example Request

```http
POST /api/admin/service-providers/sp-1021/activate/
Authorization: Bearer <admin_token>
