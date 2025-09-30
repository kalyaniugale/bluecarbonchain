import React from 'react';
import Icon from '../../../components/AppIcon';

const AdminSummaryCards = ({ stats }) => {
  const cards = [
    {
      id: 'projects_review',
      title: 'Projects Under Review',
      value: stats?.projectsUnderReview,
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
      description: 'Awaiting verification'
    },
    {
      id: 'approved_credits',
      title: 'Approved Carbon Credits',
      value: `${stats?.approvedCarbonCredits?.toLocaleString()} tons`,
      change: '+8%',
      changeType: 'positive',
      icon: 'Award',
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
      description: 'CO₂ equivalent'
    },
    {
      id: 'pending_verifications',
      title: 'Pending Verifications',
      value: stats?.pendingVerifications,
      change: '-5%',
      changeType: 'negative',
      icon: 'Clock',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/10',
      description: 'Require action'
    },
    {
      id: 'total_value',
      title: 'Total System Value',
      value: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'IND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })?.format(stats?.totalSystemValue),
      change: '+15%',
      changeType: 'positive',
      icon: 'DollarSign',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      description: 'INR equivalent'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards?.map((card) => (
        <div
          key={card?.id}
          className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${card?.iconBg} flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} className={card?.iconColor} />
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon 
                name={card?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={getChangeColor(card?.changeType)} 
              />
              <span className={`text-sm font-medium ${getChangeColor(card?.changeType)}`}>
                {card?.change}
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{card?.value}</h3>
            <p className="text-sm font-medium text-foreground">{card?.title}</p>
            <p className="text-xs text-muted-foreground">{card?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSummaryCards;