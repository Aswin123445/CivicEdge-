export default function AdminSolverTaskPageHeader({ total }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white tracking-tight">
        Tasks
        <span className="text-slate-500 font-normal ml-2 text-lg">
          ({total})
        </span>
      </h1>

      <p className="text-slate-400 mt-1">
        Tasks assigned to Solvers.
      </p>
    </div>
  );
}
