# ✏️ Update Volunteer Group

**Endpoint:** `PATCH /api/admin/volunteers/groups/{id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **update the details of an existing volunteer group (army)**.

Admins may modify descriptive information such as name or purpose, but **critical group attributes like tier cannot be changed once the group is active**, to preserve system integrity and member safety.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique volunteer group ID |

---

## 🧾 Request Body (Partial Update)

```json
{
  "name": "Clean City Action Army",
  "description": "Updated description for improved public awareness."
}
