# 👤 Get Citizen Profile

**Endpoint:** `GET /api/users/me`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint retrieves the **profile information of the currently authenticated citizen**.

It returns both:
- core user details (email, role)
- associated profile data (name, phone, location, interests, etc.)

This endpoint is commonly used to:
- display user information in dashboards
- pre-fill profile edit forms
- validate logged-in user identity

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:

---

## 📥 Request Parameters

This endpoint does not require any path or query parameters.

---

## ✅ Example Request

```http
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...


