# Forum Moderation

This module allows administrators and moderators to review and manage community discussions to ensure a safe, respectful, and productive environment.

---

## 🎯 Purpose

To monitor and moderate user-generated content in the Community Forum. Admins can take corrective actions on flagged content and guide discussions when needed.

---

## 👤 Roles Involved

- **Admin / Moderator**: Full moderation rights
- **Citizen**: Can report content, but not moderate

---

## 📦 Key Actions

### 🔍 1. Review Flagged Posts/Comments

- View list of all threads or comments flagged by users.
- Each flagged item includes:
  - Reporter details
  - Number of reports
  - Reason (if provided)
  - Time of posting

### ✅ 2. Approve or Delete Content

- Admin can:
  - Approve clean content (dismiss reports)
  - Soft delete or permanently remove violations
- Deleted content is stored with a `moderation_reason` and `moderated_by` for audit logging.

### ⚠️ 3. Warn Users

- Issue a formal warning to a user.
- Stored in `user_warnings` table.
- Repeat warnings can escalate to temporary or permanent suspension.

### 📌 4. Pin or Highlight Admin Posts

- Pin posts to top of forum threads or categories (e.g., community guidelines, announcements).
- Highlight official posts using badges like "Admin", "Moderator", or with colored tags.

---

## 🧩 Supporting Tables

- `forum_reports`
- `user_warnings`
- `moderation_logs`
- `forum_threads` / `forum_comments` (status field: active/deleted/pinned)

---

## 🔗 Related Modules

- **Notification System**: Sends alerts when a post is moderated or pinned.
- **Analytics**: Tracks most reported users/posts.
- **Admin Dashboard**: Displays a moderation queue and quick actions.

---

## 📈 Future Enhancements

- AI-assisted toxicity detection
- Temporary muting or post limits for repeat violators
- Public transparency log for deleted content (optional)

