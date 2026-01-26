# 🔍 View Army Details

**Endpoint:** `GET /api/citizen/armies/{id}`  
**Auth Required:** ❌ No *(optional for personalized data)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **complete details of a specific community army**.

It provides information about the army’s purpose, category, membership statistics, and participation rules.

If the citizen is authenticated, the response also includes:
- membership status
- eligibility requirements
- join-related indicators

---

## 🔐 Authentication

Authentication is optional.

If provided, include the JWT access token:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique army ID |

---

## ✅ Example Request

```http
GET /api/citizen/armies/army-123e4567
