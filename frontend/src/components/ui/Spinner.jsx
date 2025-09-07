import { Loader2 } from "lucide-react";

function Spinner({text = "text-white"}) {
  return (
    <div className="flex items-center justify-center">
        <Loader2 className={`h-5 w-5 animate-spin ${text}`} />
    </div>
  )
}

export default Spinner;