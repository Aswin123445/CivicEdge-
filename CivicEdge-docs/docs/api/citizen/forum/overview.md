# 💬 Community Forum Module Overview

The **Community Forum Module** enables citizens to engage in open public discussions, share ideas, and collaborate on topics related to civic development and social improvement.

It provides a structured space for community dialogue while promoting respectful communication, collective problem-solving, and participatory governance through discussions and polls.

---

## 🎯 Key Objectives

- Enable citizens to create and participate in discussion threads.
- Encourage idea sharing and community-driven solutions.
- Allow commenting and constructive conversations.
- Support reactions (upvotes) to highlight valuable contributions.
- Provide content reporting to maintain healthy discussions.
- Enable civic participation through polls and voting systems.

---

## 🧱 Database Structure (Brief)

| Table | Purpose |
|-------|---------|
| `forum_threads` | Stores discussion topics created by users |
| `forum_comments` | Stores comments under discussion threads |
| `forum_reactions` | Stores reactions (upvotes/likes) |
| `forum_reports` | Stores reports for inappropriate content |
| `polls` | Stores polls created by admins |
| `poll_options` | Stores available options for each poll |
| `poll_votes` | Stores votes submitted by citizens |

---

## 🔁 Workflow

### Forum Discussions

1. **Citizen creates a thread** on a civic topic or idea.
2. **Other citizens comment** and share opinions.
3. **Users react** to threads or comments.
4. **Inappropriate content can be reported**.
5. **Admins/moderators review and moderate** reported content.

### Polls & Voting

1. **Admin creates a poll** with multiple options.
2. **Citizens view active polls**.
3. **Each citizen can vote once** per poll.
4. **Votes are stored and counted securely**.
5. **Results are displayed** in real-time or after poll closure.

---

## 📦 Available Endpoints

| Feature | Method | Endpoint |
|--------|--------|----------|
| Create Thread | `POST` | `/api/forum/threads/` |
| List Threads | `GET`
