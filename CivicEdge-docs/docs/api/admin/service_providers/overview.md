# 🏗️ Service Provider Management Overview (Admin)

The **Service Provider Management Module** allows administrators to manage external service providers responsible for executing on-ground civic works such as sanitation, road maintenance, electrical repairs, and infrastructure support.

This module acts as a **central registry and payment tracking system** for all service providers involved in civic operations.

Service providers do not have platform access.  
All actions are controlled and monitored exclusively by administrators.

---

## 🎯 Objectives

- Maintain a verified registry of service providers
- Enable activation or deactivation of providers
- Track payments made to providers
- Ensure transparency and accountability in civic expenditures
- Support structured coordination between administration and external agencies

---

## 👥 Roles & Access

| Role | Access |
|------|--------|
| **Admin** | Full access |
| **Super Admin** | Full access |
| **Citizen** | ❌ No access |
| **Solver** | ❌ No access |
| **Service Provider** | ❌ No direct access |

---

## 🧩 Models Involved

- `service_providers`
- `service_provider_categories`
- `provider_zone_mapping`
- `provider_payments`

---

## 🔄 High-Level Workflow

1. **Admin creates a service provider**
2. **Provider details are stored in the registry**
3. **Provider can be activated or deactivated**
4. **Work is executed through offline coordination**
5. **Admin records payment settlement**
6. **Payment history is stored for auditing**

---

## 📦 Available API Endpoints

### 🏢 Provider Registry

| Action | Method | Endpoint |
|-------|--------|----------|
| Create Provider | `POST` | `/api/admin/service-providers/` |
| List Providers | `GET` | `/api/admin/service-providers/` |

---

### ⚙️ Provider Status Management

| Action | Method | Endpoint |
|-------|--------|----------|
| Activate Provider | `POST` | `/api/admin/service-providers/{id}/activate/` |
| Deactivate Provider | `POST` | `/api/admin/service-providers/{id}/deactivate/` |

---

### 💰 Payment Management

| Action | Method | Endpoint |
|-------|--------|----------|
| Mark Payment Paid | `POST` | `/api/admin/service-providers/{id}/payments/` |
| View Payment History | `GET` | `/api/admin/service-providers/{id}/payments/` |

---

## 🔐 Authentication

All endpoints require a valid **Admin Bearer Token**.


---

## 🔒 Governance & Compliance

- Service providers do not authenticate into the system
- Payments recorded are settlement records only
- No real-money transfer is processed within the platform
- All actions are audit-loggable
- Designed for municipal-level accountability

---

## 📈 Future Enhancements (Not in v1)

- Provider performance scoring
- Contract and tenure tracking
- Invoice uploads
- Tender-based onboarding
- Automated provider recommendations

---

> ℹ️ This module ensures structured provider management, controlled payments, and transparent civic operations without introducing unnecessary financial or legal complexity.
