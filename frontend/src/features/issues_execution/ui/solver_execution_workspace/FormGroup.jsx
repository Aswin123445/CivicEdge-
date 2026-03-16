const FormGroup = ({ label, children }) => (
  <div>
    <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
      {label}
    </label>
    {children}
  </div>
);
export default FormGroup;