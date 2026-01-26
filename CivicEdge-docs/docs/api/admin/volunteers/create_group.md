# ➕ Create Volunteer Group

**Endpoint:** `POST /api/admin/volunteers/groups/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **create a new volunteer group (army)** within CivicEdge.

Each volunteer group represents a specific civic initiative or service category and is classified into a **responsibility tier**:

- **Tier 1** → Open, non-risk participation  
- **Tier 2** → High-responsibility participation requiring admin verification  

The tier selected during creation determines the joining and validation workflow for citizens.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "name": "Clean City Army",
  "description": "Community-driven cleanliness and waste awareness initiative.",
  "tier": "tier1",
  "requires_verification": false
}
