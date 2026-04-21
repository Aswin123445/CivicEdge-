import React from "react";

const SolverEffectedSection = ({ formData, handleInputChange, error }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
        Area Observations
      </h3>
      <div className="space-y-2">
        <label className="text-sm text-slate-600">
          Describe the condition of the affected area
        </label>
        <textarea
          name="affected_area_description"
          value={formData.affected_area_description}
          onChange={handleInputChange}
          placeholder="e.g., Drainage blockage causing water accumulation near roadside..."
          className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
          required
        ></textarea>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </section>
  );
};

export default SolverEffectedSection;
