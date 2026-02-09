# Service Provider Management

This module allows administrators to manage verified service providers responsible for executing on-ground civic works such as waste removal, road repair, electrical maintenance, and infrastructure fixes. It ensures quality control, budget accountability, and structured coordination between solvers and external agencies.

---

## ✅ Core Features

- View full list of registered service providers  
- Filter/search providers by:
  - Provider name  
  - Service type (waste, road, electrical, water, drainage, etc.)  
  - Status (active / inactive / blacklisted)  
  - Zone / ward coverage  
- Add new service providers  
- Update provider details  
- Enable or disable providers  
- Temporarily suspend or blacklist providers  
- View provider performance history  
- Track assigned works and completion status 
- Manage Payment 

---

## 🧩 Key Tables

- `service_providers`  
- `service_provider_categories`  
- `provider_zone_mapping`  
- `provider_work_history`  
- `provider_status_logs` *(optional)*  

---

## 🔄 Admin Flow

1. Admin creates or registers a service provider  
2. Admin assigns service category and operational zones  
3. Provider becomes available for solver selection  
4. Solver proposes provider in site visit report  
5. Admin reviews solver report and proposed provider  
6. Admin approves provider and budget  
7. Provider executes work (offline coordination)  
8. Solver submits completion report  
9. Admin verifies and closes the complaint  

---

## 👷 Service Provider Usage Examples

- **Waste Management Provider**  
  Assigned for garbage collection or waste clearance complaints.

- **Road Maintenance Contractor**  
  Used for pothole filling, tar road repair, or sidewalk restoration.

- **Electrical Service Provider**  
  Handles streetlight repairs or electrical hazards.

- **Drainage & Water Teams**  
  Engaged during flooding, blockage, or pipeline leakage issues.

---

## 🔗 Dependencies

- **Complaint System** – Providers are linked to approved complaints  
- **Solver Module** – Solvers select providers during site visit reports  
- **Budget & Approval Module** – Admin validates estimated cost  
- **Zone Management** – Providers operate within assigned wards  
- **Analytics Module** – Tracks provider performance and expenses  

---

## 📈 Future Enhancements

- Provider rating and performance scoring  
- Contract period management  
- Penalty tracking for delays  
- Automated provider suggestion based on complaint type  
- Budget utilization dashboard  
- Tender-based provider onboarding system  

---
