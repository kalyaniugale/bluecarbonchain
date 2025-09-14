import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../components/ui/SessionManager';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import CredentialsInfo from './components/CredentialsInfo';
import EnvironmentalBackground from './components/EnvironmentalBackground';

const Login = () => {
  const { isAuthenticated, user, getDashboardRoute } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated && user) {
      const dashboardRoute = getDashboardRoute(user?.role);
      navigate(dashboardRoute, { replace: true });
    }
  }, [isAuthenticated, user, navigate, getDashboardRoute]);

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <EnvironmentalBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginHeader />
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50 p-8">
            <LoginForm />
          </div>
          <CredentialsInfo />
        </div>
      </div>
      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <div className="text-center text-xs text-muted-foreground">
          <p>&copy; {new Date()?.getFullYear()} BlueCarbonChain. All rights reserved.</p>
          <p className="mt-1">Empowering sustainable carbon credit management</p>
        </div>
      </div>
    </div>
  );
};

export default Login;