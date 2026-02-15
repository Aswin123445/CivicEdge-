import { useAuthInit } from "./hooks/refreshHook";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
  useAuthInit()
  return (
    <>
    <div className="min-h-screen flex flex-col ">
      <AppRoutes />
      {/* INSIDE root, AFTER footer is fine */}
      
    </div>
        <Toaster richColors position="top-right" />

       </>
  );
}
export default App;
