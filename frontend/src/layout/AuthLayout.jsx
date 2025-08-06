import { Outlet } from "react-router-dom";
import Card from "../components/ui/Card";
export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="py-7 px-1">
          <Outlet />
      </Card> 
    </div>
  );
}
