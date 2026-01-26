# ✏️ Update Poll

**Endpoint:** `PATCH /api/admin/polls/{poll_id}/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **update limited, non-critical fields of an existing poll**.

To preserve voting integrity, **poll options and votes cannot be modified once the poll is active**.

This endpoint is typically used to:
- correct descriptions
- extend or shorten expiry time
- update visibility settings

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `poll_id` | UUID | ✅ | Poll identifier |

---

## 🧾 Request Body (Partial Update)

```json
{
  "description": "Updated description with clearer policy context.",
  "expires_at": "2026-03-05T23:59:59Z"
}
