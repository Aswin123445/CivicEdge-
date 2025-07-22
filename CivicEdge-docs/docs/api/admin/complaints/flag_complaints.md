# 🚩 Delete or Flag Complaint

This endpoint allows **admins** to either **soft-delete** or **flag** a complaint for moderation. This helps maintain content quality, manage spam, and enforce civic platform standards.

---

## 🔗 Endpoint

`PATCH /api/admin/complaints/{complaint_id}/moderate/`

---

## 🔐 Authentication

**Required:** ✅ Yes  
**Header:** `Authorization: Bearer <access_token>`  
Must be an admin user.

---

## 🧾 Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `complaint_id` | `uuid` | ✅ | ID of the complaint to be moderated |

---

## 📝 Request Body

Send a JSON body specifying the moderation action.

### 🎯 Moderation Actions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | `string` | ✅ | Must be one of: `delete`, `flag` |
| `reason` | `string` | ✅ | Short reason or explanation for the action |

### Example

```json
{
  "action": "flag",
  "reason": "Inappropriate language and fake media"
}
