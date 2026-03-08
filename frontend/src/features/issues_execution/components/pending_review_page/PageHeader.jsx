export default function PageHeader({ total = 0 }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white tracking-tight">
        In Review Issues
        <span className="text-slate-500 font-normal ml-2 text-lg">
          ({total})
        </span>
      </h1>

      <p className="text-slate-400 mt-1">
        Issues submitted by citizens awaiting admin verification.
      </p>
    </div>
  );
}
