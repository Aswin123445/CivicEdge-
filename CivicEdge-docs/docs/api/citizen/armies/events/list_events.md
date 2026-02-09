# 📅 List Army Events

**Endpoint:** `GET /api/citizen/armies/events`  
**Auth Required:** ❌ No *(required for registration-related details)*  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves a list of **community service events** created under different community armies.

Events may include:
- planned activities (clean-up drives, awareness programs)
- emergency activities (blood requirements, disaster response)

While events are publicly visible, **only authenticated citizens who are members of the respective army can register and participate**.

When authenticated, the response may include:
- registration status
- eligibility indicators

---

## 🔐 Authentication

Authentication is optional.

If provided, include the JWT access token in the request header:


---

## 🔎 Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `army_id` | UUID | Filter events by a specific army |
| `event_type` | string | `planned` or `emergency` |
| `status` | string | `upcoming`, `active`, `completed` |
| `location` | string | Filter by ward, zone, or area |
| `page` | integer | Page number |
| `limit` | integer | Number of events per page |

---

## ✅ Example Request

```http
GET /api/citizen/armies/events?event_type=planned&status=upcoming&page=1&limit=10
