import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionsCard = ({ onCreateProject }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create New Project',
      description: 'Start a new carbon offset project',
      icon: 'Plus',
      color: 'text-success',
      bgColor: 'bg-success/10',
      action: () => onCreateProject?.()
    },
    {
      title: 'View Token Flow',
      description: 'Track FTDC to CCT conversion process',
      icon: 'GitBranch',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => navigate('/token-flow-visualization')
    },
    {
      title: 'Project Reports',
      description: 'Generate carbon offset reports',
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => console.log('Generate reports')
    },
    {
      title: 'Data Analytics',
      description: 'View project performance metrics',
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      action: () => console.log('View analytics')
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common tasks and navigation</p>
        </div>
      </div>
      <div className="space-y-3">
        {quickActions?.map((action, index) => (
          <button
            key={index}
            onClick={action?.action}
            className="w-full flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-all duration-150 hover:transform hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={action?.icon} size={18} className={action?.color} />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-foreground">{action?.title}</div>
              <div className="text-sm text-muted-foreground">{action?.description}</div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Need help? Contact support for assistance with your projects.
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;