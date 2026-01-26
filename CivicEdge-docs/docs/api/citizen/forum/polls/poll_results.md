# 📊 View Poll Results

**Endpoint:** `GET /api/forum/polls/{id}/results`  
**Auth Required:** ❌ No *(depends on poll settings)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **results of a specific poll**, showing how citizens have voted.

Result visibility depends on poll configuration:
- some polls display results in real time
- others reveal results only after poll closure

This ensures flexibility based on administrative decision-making.

---

## 🔐 Authentication

Authentication is optional.

If required by poll settings, include the JWT access token:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique poll ID |

---

## ✅ Example Request

```http
GET /api/forum/polls/poll1234-7b89-4abc-9d10-556677889900/results
