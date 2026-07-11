import { useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import toast from 'react-hot-toast';
import PageLoading from '../components/loaders/pageLoading';

// const ProtectedRoute = () => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   // Capture the user's status the exact moment they land on the route
//   const wasLoggedInOnMount = useRef(!user);

//   // MOVE THIS UP: Hook must run before any early returns!
//   useEffect(() => {
//     // We also want to wait until loading is finished before throwing the error.
//     if (!loading && !wasLoggedInOnMount.current && !user) {
//       toast.error('You must login first', { id: 'bounce-toast' });
//     }
//   }, [user, loading]); 

//   // 1. NOW you can do your early returns
//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   // 2. If no user is logged in, redirect them to the login page
//   if (!user) {
//     return <Navigate to="/signin" state={{ from: location }} replace />;
//   }

//   // 3. If logged in, render the child components via <Outlet />
//   return <Outlet />;
// };

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Track the previous user state to detect a logout event
  const prevUser = useRef(user);

  useEffect(() => {
    // Only show the toast if we were previously logged in, 
    // now we are NOT logged in, and we are not in a loading state.
    if (!loading && prevUser.current && !user) {
      toast.error('You have been logged out.', { id: 'logout-toast' });
    }
    prevUser.current = user;
  }, [user, loading]); 

  if (loading) {
    return (
      // <div className="flex h-screen items-center justify-center">
      //   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      // </div>
      <PageLoading />
    );
  }

  if (!user) {
    // toast.error('You must log in first!', { id: 'log-first-toast' });
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;