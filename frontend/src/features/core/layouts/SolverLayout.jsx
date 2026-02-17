// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../../../components/common/Footer";
import SolverNavbar from "../components/solver/SolverNavbar";
export default function SolverLayout() {
  return (
    <>
      <SolverNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
