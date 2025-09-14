import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectOverviewCard = ({ projectStats }) => {
  const statItems = [
    {
      label: 'Active Projects',
      value: projectStats?.active,
      icon: 'TreePine',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Pending Verification',
      value: projectStats?.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Completed Projects',
      value: projectStats?.completed,
      icon: 'CheckCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Carbon Credits Earned',
      value: `${projectStats?.carbonCredits?.toLocaleString()} CCT`,
      icon: 'Leaf',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Project Overview</h3>
          <p className="text-sm text-muted-foreground">Your carbon offset initiatives</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statItems?.map((item, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={item?.icon} size={16} className={item?.color} />
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-foreground">{item?.value}</div>
                <div className="text-xs text-muted-foreground">{item?.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress This Quarter</span>
          <span className="font-medium text-success">+{projectStats?.quarterlyGrowth}%</span>
        </div>
        <div className="mt-2 bg-muted rounded-full h-2">
          <div 
            className="bg-success rounded-full h-2 transition-all duration-500"
            style={{ width: `${Math.min(projectStats?.quarterlyGrowth, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewCard;