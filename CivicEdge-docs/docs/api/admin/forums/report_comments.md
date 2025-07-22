# 📊 Generate Insightful AI Report on Forum Topic

This endpoint allows **administrators** to generate an **AI-driven summary report** for a forum post. The report includes:

- 🧠 Topic Summary  
- 💬 Aggregated Sentiment Analysis (Positive / Negative / Neutral)  
- 🔍 Key Concerns and Suggestions Extracted from Comments  
- 🧭 Relevance Score to Society  

---

## 🔗 Endpoint

`POST /api/admin/forums/{post_id}/insight-report/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Must be an admin user.

---

## 🧾 Path Parameters

| Parameter  | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| `post_id`  | `uuid` | ✅       | ID of the forum post to analyze      |

---

## 📤 Response

### ✅ Success: `200 OK`

```json
{
  "post_title": "Ban on single-use plastics",
  "summary": "This post discusses the adverse effects of single-use plastics and suggests stricter municipal enforcement.",
  "sentiment_summary": {
    "positive": 68,
    "neutral": 21,
    "negative": 11
  },
  "key_points": [
    "Environmental damage due to plastics is severe",
    "Citizens support fines for littering",
    "Request for biodegradable alternatives in shops"
  ],
  "relevance_score": 8.7,
  "generated_at": "2025-07-15T08:45:00Z"
}
