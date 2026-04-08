# CivicEdge 🏙️

> Building responsible citizens. Creating a smarter society.

🌐 **Live:** [civicedge.site](https://civicedge.site) &nbsp;|&nbsp; 📖 **Documentation:** [aswin123445.github.io/CivicEdge-](https://aswin123445.github.io/CivicEdge-/)

---

## 🌍 The Problem

Modern society faces a silent but critical issue:

> ❗ Lack of civic responsibility.

- Citizens often believe their role ends with voting once every few years
- Governments operate with limited continuous citizen engagement
- Public infrastructure suffers due to lack of ownership

This creates a **disconnect between people and the society they live in**.

---

## 💡 The Solution

**CivicEdge** is designed to bridge this gap.

It transforms citizens from **passive observers → active contributors** by:

- Giving them a **voice**
- Making them **participants**
- Building a sense of **ownership**

> Because real change is not a feature — it is a **behavioral shift**.

---

## ⚡ Core Features

### 🧾 Issue Reporting — *"Your Voice Matters"*
- Report real-world civic issues with structured workflows
- Transparent flow: **Citizen → Admin → Solver**
- Ensures accountability and resolution

### 🤝 Volunteer System — *"Be Part of the Change"*
- Join volunteer groups and initiatives
- Participate in local events
- Track contributions and engagement

### 🗳️ Poll System — *"Your Opinion Counts"*
- Community-driven decision making
- Citizens influence administrative actions
- Data-backed governance

### 💬 Forums — *"Ideas Shape Society"*
- Open discussions on societal improvements
- Share ideas, feedback, and innovations
- Community engagement and awareness

### 🏆 Rewards & Recognition — *"Good Actions Matter"*
- Points-based engagement system
- Volunteer tracking and recognition
- Encourages long-term civic participation

---

## 🧠 System Architecture

CivicEdge is built with **scalability and real-world usage in mind**:

| Layer | Technology |
|---|---|
| Backend | Django + Django REST Framework |
| Frontend | React + Tailwind CSS |
| State Management | Redux Toolkit (RTK Query) |
| Database | PostgreSQL |
| Async Tasks | Celery + Redis |
| AI Integration | Hugging Face (moderation & analytics) |
| Authentication | JWT / OAuth2 |
| Infrastructure | Docker |

---

## ⚙️ Engineering Highlights

- 🚀 Optimized notification system using `last_seen_at` strategy
- 📊 Efficient poll aggregation using database-level queries
- 🔐 Role-Based Access Control (Citizen / Solver / Admin)
- 🧩 Modular Django architecture (`apps/`, `shared/`)
- 🌐 API-first backend design
- 📦 Fully containerized for consistent deployment

---

## 📁 Project Structure

<details>
<summary>🔧 Backend</summary>

```
backend/
├── apps/
│   ├── users/
│   ├── issues/
│   ├── polls/
│   ├── forums/
│   └── notifications/
├── config/
├── shared/
├── staticfiles/
├── manage.py
└── requirements.txt
```

</details>

<details>
<summary>🎨 Frontend</summary>

```
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
```

</details>

<details>
<summary>🐳 DevOps</summary>

```
docker/
docker-compose.yml
docker-compose.dev.yml
docker-compose.prod.yml
```

</details>

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/civicedge.git
cd civicedge
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root of your project:

```env
SECRET_KEY=
DATABASE_URL=
REDIS_URL=
OPENAI_API_KEY=
```

---

## 📡 API Documentation

| Type | URL |
|---|---|
| Swagger | http://localhost:8000/api/docs/ |
| ReDoc | http://localhost:8000/api/redoc/ |

---

## 🚀 Future Enhancements

- 💬 Real-time communication (WebSockets)
- 📱 Full mobile app (Flutter)
- 🤖 Advanced AI-driven civic insights
- 🌍 Multi-city scalability

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🔥 Final Thought

CivicEdge is not just about solving civic issues — it is about changing how people think about society.

> A better society is built when citizens take responsibility.
> **CivicEdge is a step toward that future.**