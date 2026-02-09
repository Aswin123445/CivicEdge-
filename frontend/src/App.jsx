import { useAuthInit } from "./hooks/refreshHook";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
  useAuthInit()
  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-right" />    </>
  );
}
export default App;
