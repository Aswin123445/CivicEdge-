# ✏️ Update a Discussion Thread

**Endpoint:** `PATCH /api/forum/threads/{id}`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **update their previously created discussion thread**.

Updates are permitted only if:
- the thread belongs to the authenticated citizen
- the thread has not been locked or removed by moderators

Typically, users can update:
- title
- content
- category

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique thread ID |

---

## 🧾 Request Body (Partial)

Send only the fields you want to update:

```json
{
  "title": "Updated waste segregation idea",
  "content": "Adding awareness boards near apartments could improve participation.",
  "category": "Sanitation"
}
