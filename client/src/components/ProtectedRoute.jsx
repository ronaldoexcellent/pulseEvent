import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // We use localStorage as a "mock" session for your frontend prototype.
  // When your backend dev arrives, they will replace this with a real token check.
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated');

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}