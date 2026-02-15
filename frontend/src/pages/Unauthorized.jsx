import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  const { role } = useSelector((s) => s.auth);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>403 – Access Denied</h1>
      <p>You don’t have permission to access this page.</p>

      {role === "admin" && (
        <Link to="/admin/management/citizens">Go to Admin Home</Link>
      )}
      {role === "solver" && (
        <Link to="/solver-dashboard">Go to Solver Home</Link>
      )}
      {role === "citizen" && (
        <Link to="/home">Go to Home</Link>
      )}
    </div>
  );
}
