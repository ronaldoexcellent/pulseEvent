import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust path

export default function ProtectedRoute({ requireChecked = false }) {
  const { token, user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  // 1. Check if they are logged in at all
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // 2. Check if this specific route requires the 'checked' column to be true
  // Note: Your backend MUST send { checked: true/false } inside the user object during login!
  if (requireChecked && user && user.checked !== true) {
    // Redirect them to an unauthorized page or dashboard
    return <Navigate to="/pending-approval" replace />;
  }

  // If they pass the checks, render the requested page
  return <Outlet />;
}