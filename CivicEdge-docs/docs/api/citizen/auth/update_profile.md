# ✏️ Update Citizen Profile

**Endpoint:** `PUT /api/users/me/profile`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an authenticated citizen to **update their profile information**.

Only profile-related fields can be modified.  
Authentication credentials such as email and password are **not updated through this endpoint**.

---

## 🔐 Authentication

Include the **JWT access token** in the `Authorization` header:


---

## 📥 Request Body

All fields are optional. Only provided fields will be updated.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ❌ | Full name of the citizen |
| `phone` | string | ❌ | Contact number |
| `avatar_url` | string | ❌ | Profile image URL |
| `location` | string | ❌ | Residential location |
| `zone` | string | ❌ | Administrative zone |
| `interests` | array | ❌ | Civic interests (tags/topics) |

---

## ✅ Example Request

```http
PUT /api/users/me/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
Content-Type: application/json

{
  "name": "Aswin Sandeep",
  "phone": "9876543210",
  "location": "Ward 5",
  "zone": "North Zone",
  "interests": ["cleanliness", "environment"]
}
