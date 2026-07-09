import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import toast from 'react-hot-toast';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // 1. While checking the backend for the cookie, show a loading spinner
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // 2. If no user is logged in, redirect them to the login page
  if (!user) {
    toast.error('You must login first');
    return <Navigate to="/signin" replace />;
  }

  // 3. If logged in, render the child components via <Outlet />
  return <Outlet />;
};

export default ProtectedRoute;