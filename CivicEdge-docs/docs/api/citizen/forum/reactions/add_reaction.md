# 👍 Add Reaction

**Endpoint:** `POST /api/forum/reactions/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **react to a discussion thread or a comment**.

Reactions help:
- highlight valuable contributions
- encourage constructive participation
- surface popular content within the community

Typical reactions include upvotes or likes.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🧾 Request Body

```json
{
  "target_type": "thread",
  "target_id": "a9c4d2e1-7b3f-4e91-baa7-998877665544",
  "reaction_type": "upvote"
}
