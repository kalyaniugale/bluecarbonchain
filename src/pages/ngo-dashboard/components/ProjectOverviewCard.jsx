import React from 'react';
import Icon from '../../../components/AppIcon';

const nf = new Intl.NumberFormat('en-IN');

const StatTile = ({ icon, label, value, color, bgColor }) => (
  <div className="rounded-lg p-4 bg-muted/25 hover:bg-muted/40 transition">
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 ${bgColor} rounded-md grid place-items-center`}>
        <Icon name={icon} size={18} className={color} />
      </div>
      <div className="flex-1">
        <div className="text-xl font-semibold leading-tight text-foreground">
          {value}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  </div>
);

const ProjectOverviewCard = ({ projectStats }) => {
  const {
    active = 0,
    pending = 0,
    completed = 0,
    carbonCredits = 0,
    quarterlyGrowth = 0,
  } = projectStats || {};

  const statItems = [
    { label: 'Active Projects', value: nf.format(active), icon: 'TreePine', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
    { label: 'Pending Verification', value: nf.format(pending), icon: 'Clock', color: 'text-amber-700', bgColor: 'bg-amber-100' },
    { label: 'Completed Projects', value: nf.format(completed), icon: 'CheckCircle', color: 'text-blue-700', bgColor: 'bg-blue-100' },
    { label: 'Carbon Credits Earned', value: `${nf.format(carbonCredits)} CCT`, icon: 'Leaf', color: 'text-green-700', bgColor: 'bg-green-100' },
  ];

  const growth = Math.max(-100, Math.min(100, Number(quarterlyGrowth) || 0));

  return (
    <section aria-labelledby="proj-overview" className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <header className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg grid place-items-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 id="proj-overview" className="text-lg font-semibold text-foreground">Project Overview</h3>
            <p className="text-sm text-muted-foreground">Your carbon offset initiatives</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            growth >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}
          title="Growth vs last quarter"
        >
          <Icon name={growth >= 0 ? 'TrendingUp' : 'TrendingDown'} size={14} />
          {growth > 0 ? '+' : ''}{growth}%
        </span>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statItems.map((s) => (
          <StatTile key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress This Quarter</span>
          <span className={`font-medium ${growth >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
            {growth > 0 ? '+' : ''}{growth}%
          </span>
        </div>
        <div className="mt-2 bg-muted rounded-full h-2">
          <div
            className={`rounded-full h-2 transition-all duration-500 ${growth >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
            style={{ width: `${Math.abs(growth)}%` }}
            aria-label="Quarterly progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.abs(growth)}
          />
        </div>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Tip: hover icons to learn terms • FDCT = funding token, CCT = carbon credit token.
      </p>
    </section>
  );
};

export default ProjectOverviewCard;
