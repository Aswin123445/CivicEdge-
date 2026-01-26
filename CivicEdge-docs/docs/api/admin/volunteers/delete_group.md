# 🗑️ Delete Volunteer Group

**Endpoint:** `DELETE /api/admin/volunteers/groups/{id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **delete a volunteer group (army)** from the CivicEdge platform.

Deletion is restricted to prevent data loss and operational disruption.  
If a group has active members or events, it **cannot be permanently deleted** and must instead be deactivated.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique volunteer group ID |

---

## ⚠️ Deletion Rules

A volunteer group **can be deleted only if**:

- No active members exist
- No upcoming or active events exist

Otherwise, the system enforces **soft deletion via status update**.

---

## ✅ Example Success Response

```json
{
  "success": true,
  "message": "Volunteer group deleted successfully."
}
