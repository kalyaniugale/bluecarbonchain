import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedBreadcrumb = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const getDashboardLabel = (role) => {
    switch (role) {
      case 'ngo':
        return 'NGO Dashboard';
      case 'investor':
        return 'Investor Dashboard';
      case 'admin':
        return 'NCCR Admin Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const getPageLabel = (pathname) => {
    switch (pathname) {
      case '/token-flow-visualization':
        return 'Token Flow Visualization';
      case '/ngo-dashboard':
        return 'NGO Dashboard';
      case '/investor-dashboard':
        return 'Investor Dashboard';
      case '/nccr-admin-dashboard':
        return 'NCCR Admin Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const buildBreadcrumbs = () => {
    const breadcrumbs = [];
    const currentPath = location?.pathname;
    const dashboardRoute = getDashboardRoute(user?.role);
    const dashboardLabel = getDashboardLabel(user?.role);

    // Always include dashboard as first item if not currently on dashboard
    if (currentPath !== dashboardRoute) {
      breadcrumbs?.push({
        label: dashboardLabel,
        path: dashboardRoute,
        icon: 'LayoutDashboard',
        clickable: true
      });
    }

    // Add current page
    breadcrumbs?.push({
      label: getPageLabel(currentPath),
      path: currentPath,
      icon: currentPath === '/token-flow-visualization' ? 'GitBranch' : 'LayoutDashboard',
      clickable: false
    });

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  // Don't show breadcrumbs if only one item (current page)
  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-muted-foreground/60" />
          )}
          
          {crumb?.clickable ? (
            <button
              onClick={() => handleBreadcrumbClick(crumb?.path)}
              className="flex items-center space-x-1 hover:text-foreground transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1 py-0.5"
              aria-label={`Go to ${crumb?.label}`}
            >
              <Icon name={crumb?.icon} size={14} />
              <span className="hover:underline">{crumb?.label}</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1 text-foreground font-medium">
              <Icon name={crumb?.icon} size={14} />
              <span>{crumb?.label}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default RoleBasedBreadcrumb;