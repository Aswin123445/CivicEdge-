# ➕ Create Service Provider

**Endpoint:** `POST /api/admin/service-providers/`  
**Auth Required:** ✅ Yes (Admin / Super Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **register a new service provider** in the CivicEdge system.

Service providers represent external agencies or contractors responsible for executing on-ground civic works such as waste management, road repair, electrical maintenance, or drainage services.

Service providers do not receive login access — they are managed entirely by the administration.

---

## 🎯 Purpose

- Maintain a verified registry of external service providers
- Enable structured provider selection during civic operations
- Ensure accountability and traceability of civic expenditures

---

## 🔐 Authentication

Include a valid admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "name": "GreenClean Waste Solutions",
  "category": "Waste Management",
  "contact_person": "Ravi Kumar",
  "phone": "+91-9876543210",
  "email": "contact@greenclean.com",
  "zones": ["Ward 7", "Ward 11"],
  "address": "Industrial Area, Sector 4",
  "notes": "Approved municipal waste contractor"
}
