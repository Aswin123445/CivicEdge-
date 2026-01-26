# 📤 Export Poll Results

**Endpoint:** `GET /api/admin/polls/{poll_id}/export/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **export finalized poll results** for offline use, reporting, or archival purposes.

Exported data can be used for:
- government or municipal reports
- transparency documentation
- data analysis
- public disclosures

Only **closed or expired polls** can be exported.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🔗 Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `poll_id` | UUID | ✅ | Poll identifier |

---

## 📄 Export Formats (Optional)

| Format | Description |
|------|-------------|
| `pdf` | Printable civic report |
| `csv` | Spreadsheet-friendly |
| `xlsx` | Excel export |
| `json` | Raw structured data |

**Default:** `pdf`

---

## 🔍 Query Parameter (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | `pdf`, `csv`, `xlsx`, `json` |

---

## ✅ Example Request

```http
GET /api/admin/polls/poll-501/export/?format=pdf
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
