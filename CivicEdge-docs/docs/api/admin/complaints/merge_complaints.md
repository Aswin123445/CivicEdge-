# 🔗 Merge Duplicate Complaints

**Endpoint:** `POST /api/admin/complaints/merge/`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows administrators to **merge multiple duplicate complaints into a single primary complaint**.

Duplicate complaints may arise when several citizens report the same issue from the same location.  
Merging helps reduce redundancy while preserving all citizen reports for transparency and analytics.

After merging:
- one complaint is marked as the **primary complaint**
- all other complaints are marked as **merged**
- resolution progress is tracked under the primary complaint

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "primary_complaint_id": "cmp-1023",
  "duplicate_complaint_ids": [
    "cmp-1041",
    "cmp-1056"
  ],
  "remarks": "Multiple reports for the same garbage overflow at Market Road."
}
