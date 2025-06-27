import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export  function useRequireAuth(redirectUrl = '/login') {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check both Firebase auth and localStorage backup
    const hasLocalAuth = localStorage.getItem('konkora_admin_auth') === 'true';
    
    if (!loading && !currentUser && !hasLocalAuth) {
      navigate(redirectUrl);
    }
  }, [currentUser, loading, navigate, redirectUrl]);

  return { 
    currentUser, 
    loading,
    // Return an object that simulates a user if we have local auth
    hasAuth: !!currentUser || localStorage.getItem('konkora_admin_auth') === 'true'
  };
}
 
 