import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummary = ({ portfolioData }) => {
  const summaryCards = [
    {
      title: 'Current Holdings',
      value: portfolioData?.currentHoldings?.toLocaleString(),
      unit: 'FTDC Tokens',
      icon: 'Coins',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: portfolioData?.holdingsChange,
      changeType: portfolioData?.holdingsChange >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Portfolio Value',
      value: `₹${portfolioData?.portfolioValue?.toLocaleString()}`,
      unit: 'INR',
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: portfolioData?.valueChange,
      changeType: portfolioData?.valueChange >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Available Balance',
      value: `₹${portfolioData?.availableBalance?.toLocaleString()}`,
      unit: 'INR',
      icon: 'Wallet',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: null,
      changeType: null
    },
    {
      title: 'Total Invested',
      value: `₹${portfolioData?.totalInvested?.toLocaleString()}`,
      unit: 'INR',
      icon: 'PieChart',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: portfolioData?.investmentChange,
      changeType: portfolioData?.investmentChange >= 0 ? 'positive' : 'negative'
    }
  ];

  const getChangeIcon = (changeType) => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return null;
  };

  const getChangeColor = (changeType) => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2 mb-6">
          <Icon name="BarChart3" size={24} className="text-primary" />
          <span>Portfolio Summary</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {summaryCards?.map((card, index) => (
            <div
              key={index}
              className="bg-background rounded-lg border border-border p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${card?.bgColor} flex items-center justify-center`}>
                      <Icon name={card?.icon} size={16} className={card?.color} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{card?.title}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">{card?.value}</div>
                    <div className="text-xs text-muted-foreground">{card?.unit}</div>
                  </div>
                </div>

                {card?.change !== null && (
                  <div className={`flex items-center space-x-1 text-sm ${getChangeColor(card?.changeType)}`}>
                    <Icon name={getChangeIcon(card?.changeType)} size={14} />
                    <span>{Math.abs(card?.change)}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2 mb-4">
          <Icon name="Activity" size={20} className="text-accent" />
          <span>Recent Activity</span>
        </h3>

        <div className="space-y-3">
          {portfolioData?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border">
              <div className={`w-8 h-8 rounded-full ${activity?.type === 'purchase' ? 'bg-success/10' : activity?.type === 'sale' ? 'bg-error/10' : 'bg-primary/10'} flex items-center justify-center`}>
                <Icon 
                  name={activity?.type === 'purchase' ? 'Plus' : activity?.type === 'sale' ? 'Minus' : 'ArrowRightLeft'} 
                  size={14} 
                  className={activity?.type === 'purchase' ? 'text-success' : activity?.type === 'sale' ? 'text-error' : 'text-primary'} 
                />
              </div>
              
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{activity?.description}</div>
                <div className="text-xs text-muted-foreground">{activity?.timestamp}</div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-medium ${activity?.type === 'purchase' ? 'text-success' : activity?.type === 'sale' ? 'text-error' : 'text-foreground'}`}>
                  {activity?.type === 'purchase' ? '+' : activity?.type === 'sale' ? '-' : ''}{activity?.amount}
                </div>
                <div className="text-xs text-muted-foreground">{activity?.unit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;