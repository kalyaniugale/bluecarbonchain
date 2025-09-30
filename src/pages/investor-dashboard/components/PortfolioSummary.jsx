import React from 'react';
import Icon from '../../../components/AppIcon';

// helpers
const inr = (n = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

const TrendChip = ({ value, className = '' }) => {
  if (value === null || value === undefined) return null;
  const positive = value >= 0;
  return (
    <span
      className={`whitespace-nowrap inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${
        positive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
      } ${className}`}
      title={`${positive ? 'Up' : 'Down'} ${Math.abs(value)}%`}
    >
      <Icon name={positive ? 'TrendingUp' : 'TrendingDown'} size={12} />
      {Math.abs(value)}%
    </span>
  );
};
;

const PortfolioSummary = ({ portfolioData = {} }) => {
  const cards = [
    {
      title: 'Current Holdings',
      value: portfolioData.currentHoldings?.toLocaleString() ?? '0',
      sub: 'FTDC tokens',
      icon: 'Coins',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      change: portfolioData.holdingsChange,
    },
    {
      title: 'Portfolio Value',
      value: inr(portfolioData.portfolioValue ?? 0),
      sub: 'Mark-to-market',
      icon: 'TrendingUp',
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
      change: portfolioData.valueChange,
    },
    {
      title: 'Available Balance',
      value: inr(portfolioData.availableBalance ?? 0),
      sub: 'Ready to invest',
      icon: 'Wallet',
      iconBg: 'bg-accent/10',
      iconColor: 'text-accent',
      change: null,
    },
    {
      title: 'Total Invested',
      value: inr(portfolioData.totalInvested ?? 0),
      sub: 'Lifetime',
      icon: 'PieChart',
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary',
      change: portfolioData.investmentChange,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Icon name="BarChart3" size={22} className="text-primary" />
            Portfolio Summary
          </h2>
          <span className="text-xs text-muted-foreground">
            Updated just now
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c) => (
<div
  key={c.title}
  className="relative rounded-lg border border-border bg-background p-4 hover:shadow-sm transition"
>
  {/* top-right chip */}
  <TrendChip value={c.change} className="absolute top-3 right-3" />

  <div className="flex items-start justify-between pr-14"> 
    {/* pr-14 gives breathing room for the chip */}
    <div className="flex items-center gap-2 min-w-0">
      <span className={`w-8 h-8 grid place-items-center rounded-lg ${c.iconBg}`}>
        <Icon name={c.icon} size={16} className={c.iconColor} />
      </span>
      <span className="text-sm font-medium text-muted-foreground truncate">
        {c.title}
      </span>
    </div>
  </div>

  <div className="mt-2">
    <div className="text-2xl font-bold tracking-tight text-foreground">{c.value}</div>
    <div className="text-xs text-muted-foreground">{c.sub}</div>
  </div>
</div>

          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
          <Icon name="Activity" size={18} className="text-accent" />
          Recent Activity
        </h3>

        {portfolioData?.recentActivity?.length ? (
          <ul className="space-y-3">
            {portfolioData.recentActivity.map((a, idx) => {
              const tone =
                a.type === 'purchase'
                  ? { dot: 'bg-success', icon: 'Plus', color: 'text-success' }
                  : a.type === 'sale'
                  ? { dot: 'bg-error', icon: 'Minus', color: 'text-error' }
                  : { dot: 'bg-primary', icon: 'ArrowRightLeft', color: 'text-primary' };

              return (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <span className={`mt-1 h-2 w-2 rounded-full ${tone.dot}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{a.description}</div>
                    <div className="text-xs text-muted-foreground">{a.timestamp}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${tone.color}`}>
                      {a.type === 'purchase' ? '+' : a.type === 'sale' ? '-' : ''}
                      {a.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">{a.unit}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-sm text-muted-foreground">No recent activity.</div>
        )}
      </div>
    </div>
  );
};

export default PortfolioSummary;
