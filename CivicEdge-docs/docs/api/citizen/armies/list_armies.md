# 📄 List Community Armies

**Endpoint:** `GET /api/citizen/armies/`  
**Auth Required:** ❌ No *(optional for personalized data)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves a list of **available community armies** that citizens can explore and join.

Community armies represent service-based citizen groups such as environmental volunteers, blood donation teams, emergency responders, and social service groups.

The response may vary slightly based on authentication status:
- unauthenticated users can view basic army information
- authenticated users can see join status and eligibility indicators

---

## 🔐 Authentication

Authentication is optional.

If provided, include the JWT access token:


---

## 🔎 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter armies by service category |
| `tier` | string | `tier1` or `tier2` |
| `search` | string | Search armies by name |
| `page` | integer | Page number |
| `limit` | integer | Number of armies per page |

---

## ✅ Example Request

```http
GET /api/citizen/armies/?category=environment&tier=tier1&page=1&limit=10
