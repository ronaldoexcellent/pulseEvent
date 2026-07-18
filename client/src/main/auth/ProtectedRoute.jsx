import { useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import toast from 'react-hot-toast';
import PageLoading from '../components/loaders/pageLoading';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const prevUser = useRef(user);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      if (prevUser.current) {
        toast.success('You have been logged out.', { id: 'logout-toast' });
      } else {
        toast.error('You must log in first!', { id: 'login-toast' });
      }
    }

    prevUser.current = user;
  }, [user, loading]); 

  if (loading) {
    return <PageLoading />;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;