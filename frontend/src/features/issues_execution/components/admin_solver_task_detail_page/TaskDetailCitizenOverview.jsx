import React from "react";
import SectionTitle from "../../ui/admin_solver_task_detail_page/SectionTitle";
import EvidenceThumb from "../../ui/admin_solver_task_detail_page/EvidenceThumb";

const TaskDetailCitizenOverview = ({ task, setActiveImage }) => {
  return (
    <section>
      <SectionTitle title="Citizen Evidence" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {task?.evidences.map((img, idx) => (
          <EvidenceThumb
            key={idx}
            url={img.cloudinary_url}
            onClick={() => setActiveImage(img.url)}
          />
        ))}
      </div>
    </section>
  );
};

export default TaskDetailCitizenOverview;
