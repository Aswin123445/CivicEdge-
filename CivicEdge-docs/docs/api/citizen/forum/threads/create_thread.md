# 🧵 Create a Discussion Thread

**Endpoint:** `POST /api/forum/threads/`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to create a **new discussion thread** in the Community Forum.

Threads can be used to:
- share civic ideas
- discuss local issues
- propose community improvements
- start public conversations

All threads are subject to moderation guidelines.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 🧾 Request Body

```json
{
  "title": "Need better waste segregation in Ward 5",
  "content": "Many households are mixing dry and wet waste. Awareness programs may help.",
  "category": "Sanitation"
}
