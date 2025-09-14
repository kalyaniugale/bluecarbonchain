import React from 'react';
import Icon from '../../../components/AppIcon';

const TokenFlowStats = ({ userRole }) => {
  const getStatsData = (role) => {
    const baseStats = {
      ngo: [
        {
          label: "Your Projects",
          value: "12",
          icon: "TreePine",
          color: "text-primary",
          bgColor: "bg-primary/10"
        },
        {
          label: "FTDC Tokens Created",
          value: "8,450",
          icon: "FileText",
          color: "text-accent",
          bgColor: "bg-accent/10"
        },
        {
          label: "Verified Tokens",
          value: "6,230",
          icon: "Shield",
          color: "text-success",
          bgColor: "bg-success/10"
        },
        {
          label: "CCT Converted",
          value: "4,890",
          icon: "Coins",
          color: "text-warning",
          bgColor: "bg-warning/10"
        }
      ],
      investor: [
        {
          label: "Invested Projects",
          value: "24",
          icon: "TrendingUp",
          color: "text-primary",
          bgColor: "bg-primary/10"
        },
        {
          label: "FTDC Purchased",
          value: "15,670",
          icon: "ShoppingCart",
          color: "text-accent",
          bgColor: "bg-accent/10"
        },
        {
          label: "Portfolio Value",
          value: "$234,500",
          icon: "DollarSign",
          color: "text-success",
          bgColor: "bg-success/10"
        },
        {
          label: "CCT Holdings",
          value: "12,340",
          icon: "Wallet",
          color: "text-warning",
          bgColor: "bg-warning/10"
        }
      ],
      admin: [
        {
          label: "Total Projects",
          value: "156",
          icon: "Building",
          color: "text-primary",
          bgColor: "bg-primary/10"
        },
        {
          label: "Pending Verification",
          value: "23",
          icon: "Clock",
          color: "text-accent",
          bgColor: "bg-accent/10"
        },
        {
          label: "System Token Value",
          value: "$1.2M",
          icon: "BarChart3",
          color: "text-success",
          bgColor: "bg-success/10"
        },
        {
          label: "Monthly Conversions",
          value: "2,890",
          icon: "Activity",
          color: "text-warning",
          bgColor: "bg-warning/10"
        }
      ]
    };

    return baseStats?.[role] || baseStats?.ngo;
  };

  const stats = getStatsData(userRole);

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Token Flow Statistics</h2>
          <p className="text-sm text-muted-foreground">
            {userRole === 'ngo' ? 'Your project and token overview' : 
             userRole === 'investor'? 'Your investment portfolio overview' : 'System-wide token flow overview'}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="RefreshCw" size={16} />
          <span>Updated 2 min ago</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className="bg-muted/30 rounded-lg p-4 border border-border/50 hover:border-border transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
              </div>
            </div>
            <div className="text-sm font-medium text-muted-foreground">{stat?.label}</div>
          </div>
        ))}
      </div>
      {/* Additional Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">
              {userRole === 'ngo' ? '78% of your tokens successfully verified' : 
               userRole === 'investor'? '89% portfolio growth this quarter' : '92% verification success rate system-wide'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-sm text-muted-foreground">
              {userRole === 'ngo' ? 'Average verification time: 6 weeks' : 
               userRole === 'investor'? 'Average ROI: 12.5% annually' : 'Average processing time: 5.2 weeks'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenFlowStats;