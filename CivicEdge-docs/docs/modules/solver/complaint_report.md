# Complaint Report (Solver Module)

This module enables solvers to create and submit detailed on-site inspection reports after visiting the complaint location. The report helps administrators evaluate the actual ground situation, estimated budget, and suitable service providers before approving the work.

---

## ✅ Core Features

- View assigned complaints
- Perform site visit and inspection
- Create complaint work report
- Upload site images and evidence
- Describe actual problem condition
- Propose estimated budget
- Select preferred service provider(s)
- Submit report to admin for approval
- Track report approval status
- Update resolution details after work completion

---

## 🧩 Key Tables

- `solver_complaint_reports`
- `solver_report_images`
- `solver_report_providers`
- `solver_resolution_updates` *(optional)*

---

## 🧾 Report Contents

Each complaint report may include:

- Complaint reference ID
- Solver details
- Site visit date
- Actual problem description
- Severity level (low / medium / high / emergency)
- Estimated budget
- Preferred service provider
- Expected resolution time
- Site photos / videos
- Additional remarks

---

## 🔄 Solver Flow

1. Solver views assigned complaint  
2. Solver visits complaint location  
3. Performs on-site inspection  
4. Creates complaint report  
5. Uploads evidence images/videos  
6. Selects preferred service provider from admin-approved list  
7. Adds estimated cost and timeline  
8. Submits report to admin  
9. Waits for admin approval or revision request  
10. After approval, coordinates work execution  
11. Updates completion details after issue is resolved  

---

## 👷 Provider Selection Rules

- Solvers can only view **admin-approved service providers**
- Providers are filtered based on:
  - Complaint category
  - Operational zone
  - Active status
- Solvers **cannot create or modify providers**
- Final provider approval is handled by admin

---

## 🔐 Permissions

| Role | Access |
|------|--------|
| Solver | Create & submit reports |
| Admin | Review, approve, reject |
| Citizen | View complaint progress only |

---

## 🔗 Dependencies

- **Complaint Module** – Source of assigned complaints  
- **Service Provider Management** – Provider selection  
- **User Management** – Solver identity and permissions  
- **Budget & Approval Module** – Admin validation  
- **Notification System** – Status updates  

---


## 📈 Future Enhancements

- Multiple provider quotations comparison
- Auto budget suggestion using historical data
- AI-based damage severity detection
- Geo-tagged site visit verification
- Time-based SLA monitoring
- Digital work completion certification

---
