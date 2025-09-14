import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityCard = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'upload':
        return 'Upload';
      case 'verification':
        return 'CheckCircle';
      case 'token':
        return 'Coins';
      case 'project':
        return 'TreePine';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'upload':
        return 'text-primary';
      case 'verification':
        return 'text-success';
      case 'token':
        return 'text-accent';
      case 'project':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest project updates</p>
        </div>
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-150">
            <div className={`w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={14} 
                className={getActivityColor(activity?.type)} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {activity?.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity?.description}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
                {activity?.status && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className={`text-xs font-medium ${
                      activity?.status === 'completed' ? 'text-success' :
                      activity?.status === 'pending'? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {activity?.status}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-accent hover:text-accent/80 font-medium transition-colors duration-150">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivityCard;