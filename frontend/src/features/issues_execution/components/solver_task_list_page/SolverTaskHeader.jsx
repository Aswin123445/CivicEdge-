import DottedLoaderIndicator from "../../../../components/common/DottedLoaderIndicator"

const SolverTaskHeader = ({refetch, isFetching}) => {
  return (
     <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Assigned Tasks</h1>
            <p className="text-slate-500">Manage and review all tasks assigned to you</p>
          </div>
          <button onClick={refetch} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition shadow-sm font-medium">
            {isFetching && <DottedLoaderIndicator />}
            Refresh Queue
          </button>
        </header>
  )
}

export default SolverTaskHeader
