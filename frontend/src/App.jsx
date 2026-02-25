import { useAuthBootstrap } from "./hooks/refreshHook";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import CivicEdgeLoader from "./components/Loaders/CivicEdgeLoaders";

function App() {
  useAuthBootstrap()
  const {status,access_token,role} = useSelector((state) => state.auth);
    if (status === "loading") {
    return <CivicEdgeLoader/>
  }
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
