# 🤝 Join Community Army

**Endpoint:** `POST /api/citizen/armies/{id}/join`  
**Auth Required:** ✅ Yes (Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an authenticated citizen to **join a community army**.

Joining behavior depends on the army tier:

- **Tier 1 (Open Armies)**  
  → Citizen is added instantly as a member.

- **Tier 2 (Restricted Armies)**  
  → Citizen must submit additional eligibility details.  
  → Membership is granted only after successful validation.

This design ensures both ease of participation and responsible civic engagement.

---

## 🔐 Authentication

Include the JWT access token in the `Authorization` header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | UUID | ✅ | Unique army ID |

---

## 🧾 Request Body

### 🔹 Tier 1 Army (Open)

No request body is required.

```json
{}
