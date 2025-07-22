# 📄 List All Complaints

Retrieve a list of all complaints submitted by citizens. Admins can filter complaints based on various criteria like status, category, date range, and assigned solver.

---

## 🔗 Endpoint
GET /api/admin/complaints/

---

## 🔐 Authentication

This endpoint requires **Admin** authentication.


---

## 🧾 Query Parameters (Optional)

| Parameter       | Type     | Description                                 |
|----------------|----------|---------------------------------------------|
| `status`        | string   | Filter by status (`open`, `in_progress`, `resolved`, `rejected`) |
| `category`      | string   | Filter by complaint category (e.g., `roads`, `sanitation`) |
| `date_from`     | date     | Filter complaints submitted after this date |
| `date_to`       | date     | Filter complaints submitted before this date |
| `assigned`      | boolean  | `true` or `false` — filter by assignment status |
| `solver_id`     | integer  | Show complaints assigned to a specific solver |
| `search`        | string   | Search in title or description              |

---

## 📦 Response

```json
[
  {
    "id": 24,
    "title": "Overflowing garbage near park",
    "description": "Garbage hasn't been collected in 5 days.",
    "status": "open",
    "category": "sanitation",
    "location": {
      "latitude": 11.2598,
      "longitude": 75.7804
    },
    "created_at": "2025-07-10T10:24:00Z",
    "user": {
      "id": 101,
      "name": "Amina Hiba",
      "email": "amina@example.com"
    },
    "assigned_solver": {
      "id": 202,
      "name": "Aswin Sandeep"
    }
  },
  ...
]
