# 🧭 API Endpoints Overview

Welcome to the Smart City Civic Dashboard API documentation. This section provides detailed documentation of every REST endpoint available in the system, organized by **user role** and **functional module**.

These endpoints allow citizens, admins, and solvers to interact with the platform — from submitting complaints and joining volunteer armies to assigning tasks and broadcasting announcements.

---

## 🔐 Authentication & Access

All endpoints are protected using token-based authentication.

- Auth Method: Bearer Token (`DRF Token`)
- Header Format:
```http
Authorization: Bearer <your_token_here>
