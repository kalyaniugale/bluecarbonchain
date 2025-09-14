import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionManager');
  }
  return context;
};

const SessionManager = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize session from localStorage on mount
  useEffect(() => {
    const initializeSession = () => {
      try {
        const storedUser = localStorage.getItem('bluecarbonchain_user');
        const storedAuth = localStorage.getItem('bluecarbonchain_auth');
        
        if (storedUser && storedAuth === 'true') {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        // Clear corrupted data
        localStorage.removeItem('bluecarbonchain_user');
        localStorage.removeItem('bluecarbonchain_auth');
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  const login = (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      
      // Persist to localStorage
      localStorage.setItem('bluecarbonchain_user', JSON.stringify(userData));
      localStorage.setItem('bluecarbonchain_auth', 'true');
      
      // Navigate to appropriate dashboard
      const dashboardRoute = getDashboardRoute(userData?.role);
      navigate(dashboardRoute);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear localStorage
      localStorage.removeItem('bluecarbonchain_user');
      localStorage.removeItem('bluecarbonchain_auth');
      
      // Navigate to login
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (updatedUserData) => {
    try {
      const newUserData = { ...user, ...updatedUserData };
      setUser(newUserData);
      
      // Update localStorage
      localStorage.setItem('bluecarbonchain_user', JSON.stringify(newUserData));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'ngo':
        return '/ngo-dashboard';
      case 'investor':
        return '/investor-dashboard';
      case 'admin':
        return '/nccr-admin-dashboard';
      default:
        return '/ngo-dashboard';
    }
  };

  const isAuthorizedForRoute = (route, userRole) => {
    const roleRoutes = {
      ngo: ['/ngo-dashboard', '/token-flow-visualization'],
      investor: ['/investor-dashboard', '/token-flow-visualization'],
      admin: ['/nccr-admin-dashboard', '/token-flow-visualization']
    };

    return roleRoutes?.[userRole]?.includes(route) || false;
  };

  const sessionValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    getDashboardRoute,
    isAuthorizedForRoute
  };

  return (
    <SessionContext.Provider value={sessionValue}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionManager;