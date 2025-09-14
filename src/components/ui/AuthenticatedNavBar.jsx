import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticatedNavBar = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const navigationItems = [
    {
      label: 'Dashboard',
      path: getDashboardRoute(user?.role),
      icon: 'LayoutDashboard',
      tooltip: 'Go to your dashboard'
    },
    {
      label: 'Token Flow',
      path: '/token-flow-visualization',
      icon: 'GitBranch',
      tooltip: 'View token flow visualization'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                BlueCarbonChain
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 hover:transform hover:-translate-y-0.5 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="User" size={16} />
              <span className="capitalize">{user?.role || 'User'}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
              iconSize={16}
            >
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-down z-[1001]">
          <div className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-colors duration-150 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-medium">{item?.label}</span>
              </button>
            ))}
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                <Icon name="User" size={16} />
                <span className="capitalize">{user?.role || 'User'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              >
                <Icon name="LogOut" size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AuthenticatedNavBar;