# Community Forum Module

The Community Forum allows citizens to participate in public discussions, share ideas, and collaborate with others. It also includes a **Voting System** where admins can create polls and users can vote on civic matters.

---

## ✅ Core Features

- Create and view discussion threads
- Comment on threads
- React to comments (e.g., upvotes)
- Report inappropriate content
- Admin/moderator moderation tools
- Optional: thread categorization
- **Voting System (Polls)**

---

## 📊 Voting System Overview

The Voting System allows community participation through polls posted by admins.

### Key Capabilities

- Admins can:
  - Create a poll with a title, description, options, and optional expiry date.
  - View results live or after poll closes.

- Citizens can:
  - View active polls.
  - Select and submit a vote (one vote per user).
  - See real-time or final results (based on settings).

---

## 🧩 Database Tables (Extended)

- `forum_threads`
- `forum_comments`
- `forum_reactions`
- `forum_reports`
- `polls`  
- `poll_options`  
- `poll_votes`

---

## 👥 Roles & Permissions

| Role       | Forum Features                                    | Polling Features                          |
|------------|---------------------------------------------------|--------------------------------------------|
| Citizen    | Post, comment, react, report                      | View and vote in polls                     |
| Admin      | Moderate content                                  | Create, close, and review poll results     |

---

## 🔄 Module Flow

1. **Forum**:
   - Thread → Comment → React → Report → Moderate

2. **Polls**:
   - Admin creates poll → Users vote → Results stored and displayed

---

## 🔗 Integrations

- **Authentication**: Voting and posting require login.
- **Notification**: Users get notified about new polls or voting results.
- **Admin Dashboard**: Includes poll creation UI and report dashboard.

---

## 📈 Future Enhancements

- Anonymous vs. public voting
- Poll tagging (e.g., Education, Infrastructure)
- Commenting under polls
- Analytics on poll participation by ward/region
