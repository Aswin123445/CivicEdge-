# 🛡️ Admin Forum API Overview

This section documents the **Admin-facing Forum API endpoints** for managing community discussions. These endpoints allow administrators to review citizen posts, moderate content, and generate analytical insights for decision-making.

---

## 📦 Modules Covered

- **Post Moderation**: View, manage, and remove inappropriate or harmful content.
- **Comment Oversight**: Review discussions under each post.
- **Insight & Sentiment Analysis**: Generate AI-driven summaries based on post topics and community feedback.

---

## 🧑‍💻 Authentication

All endpoints require **Admin authentication** via bearer token.

**Header Example:**
```http
Authorization: Bearer <access_token>
