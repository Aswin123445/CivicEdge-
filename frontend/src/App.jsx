import { useAuthInit } from "./hooks/refreshHook";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useAuthInit()
  return <AppRoutes />;
}
export default App;
