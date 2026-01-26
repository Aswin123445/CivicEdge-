# 🗳️ List Polls

**Endpoint:** `GET /api/forum/polls/`  
**Auth Required:** ❌ No *(login required for voting)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves a list of **polls created by administrators** for citizen participation.

Polls allow citizens to:
- express opinions on civic matters
- participate in community decision-making
- view collective public feedback

Only administrators can create polls, but all citizens can view and vote.

---

## 🔐 Authentication

Authentication is optional for viewing polls.

However:
- voting in polls requires authentication
- viewing personal vote status requires authentication

---

## 🔎 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `active`, `closed`, `upcoming` |
| `page` | integer | Page number |
| `limit` | integer | Number of polls per page |

---

## ✅ Example Request

```http
GET /api/forum/polls/?status=active&page=1&limit=10
