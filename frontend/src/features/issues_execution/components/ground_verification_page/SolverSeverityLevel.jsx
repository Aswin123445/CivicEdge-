import React from "react";

const SolverSeverityLevel = ({ formData, setFormData }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
        Severity Level
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() =>
              setFormData((p) => ({ ...p, severity_level: level }))
            }
            className={`py-3 px-2 rounded-lg text-xs font-bold border-2 transition-all ${
              formData.severity_level === level
                ? "border-blue-600 bg-blue-600 text-white shadow-md"
                : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SolverSeverityLevel;
