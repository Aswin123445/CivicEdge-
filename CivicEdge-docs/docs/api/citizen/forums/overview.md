# 🧑‍💬 Citizen Forum API Overview

This section of the API documentation covers all endpoints that allow **citizens** to interact with the **Community Forum** module. Citizens can express their opinions, share suggestions, raise societal concerns, and engage with other community members via posts and comments.

---

## 🎯 Purpose

The forum module empowers citizens to:
- Voice their thoughts and ideas.
- Collaborate with peers to suggest improvements.
- Engage in meaningful public discussions.
- Promote transparency and participatory governance.

---

## 📌 Key Features

| Feature                      | Description |
|-----------------------------|-------------|
| 📝 Create Post              | Citizens can share new ideas or discussions. |
| 📚 View Forum Posts         | Browse posts by all citizens in the community. |
| 🔍 View Post Details        | Get detailed view including content, author, and timestamp. |
| 💬 Comment on Posts         | Contribute to conversations via comments. |
| ❤️ Like or Unlike Posts     | Express support or withdraw it. |
| 🚩 Report Inappropriate Post| Flag posts violating community guidelines. |
| 📜 List My Posts            | View and manage posts created by the logged-in user. |
| 🗨️ View Comments            | Read through the comments of any forum post. |

---

## 👥 Roles & Access

| Role     | Access               |
|----------|----------------------|
| Citizen  | Full access to all endpoints in this section |
| Solver   | ❌ No access unless also registered as a citizen |
| Admin    | Has separate moderation access (documented in admin section) |

---

## 🔐 Authentication

All citizen forum APIs require authentication via JWT tokens.


---

## 🗂️ Endpoint List

| Endpoint                              | Method | Description                     |
|---------------------------------------|--------|---------------------------------|
| `/api/citizen/forum/posts/`           | `POST` | Create a new forum post         |
| `/api/citizen/forum/posts/`           | `GET`  | List all public forum posts     |
| `/api/citizen/forum/posts/{id}/`      | `GET`  | View detailed post info         |
| `/api/citizen/forum/posts/{id}/like/` | `POST` | Like or unlike a post           |
| `/api/citizen/forum/posts/{id}/comments/` | `POST` | Add a comment to a post     |
| `/api/citizen/forum/posts/{id}/comments/` | `GET`  | List all comments under a post |
| `/api/citizen/forum/posts/{id}/report/` | `POST` | Report a post                |
| `/api/citizen/forum/my-posts/`        | `GET`  | View posts created by user      |

---

## ✅ Next Steps

Proceed to implement and document individual endpoints listed above.
Start with: [`create_post.md`](./create_post.md)

