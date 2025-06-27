import  { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  redirectPath?: string;
}

export default function PrivateRoute({ redirectPath = '/login' }: PrivateRouteProps) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center flex-col space-y-3 p-2">
        <span className="loader" />
        <div className="text-base font-semibold">
          Loading...
        </div>
      </div>
    );
  }

   // Check both Firebase auth and localStorage backup
  const hasLocalAuth = localStorage.getItem('konkora_admin_auth') === 'true';
  
  return (currentUser || hasLocalAuth) ? <Outlet /> : <Navigate to={redirectPath} replace />;
 
}
 