# 🔒 Close Poll

**Endpoint:** `POST /api/admin/polls/{poll_id}/close/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **manually close an active poll** before or at its scheduled expiry time.

Once a poll is closed:
- voting is permanently disabled
- results become final
- poll data becomes immutable

This action represents the official end of a civic consultation.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `poll_id` | UUID | ✅ | Poll identifier |

---

## 🔄 Close Behavior

- Poll status → `closed`
- Voting disabled immediately
- Votes locked permanently
- Results finalized
- Closure recorded for audit

---

## 🧾 Request Body (Optional)

```json
{
  "reason": "Poll duration completed and sufficient participation achieved."
}
