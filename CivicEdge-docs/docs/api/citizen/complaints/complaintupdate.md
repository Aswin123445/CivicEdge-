# 🔄 Update a Complaint

**Endpoint:** `PATCH /api/complaints/{id}/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to update their previously submitted complaint — only if it hasn’t been assigned or marked as resolved. Typically, users can update fields like title, description, or location.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description              |
|-----------|------|----------|--------------------------|
| `id`      | UUID | ✅        | Unique complaint ID      |

---

## 🧾 Request Body (Partial)

Send only the fields you want to update:

```json
{
  "title": "Updated garbage issue",
  "description": "Now also affecting the nearby drainage.",
  "location": "Ward 12, Park Avenue - near temple"
}

{
  "success": true,
  "message": "Complaint updated successfully.",
  "data": {
    "id": "f8e2a5b4-2b47-4d3f-bdc9-75f6a3df9fc2",
    "status": "open",
    "updated_at": "2025-07-07T15:40:10Z"
  }
}
