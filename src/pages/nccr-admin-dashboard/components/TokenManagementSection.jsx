import React, { useMemo, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HIGH_VALUE_INR = 3000000; // ₹30,00,000 threshold

const TokenManagementSection = ({ tokens = [], onConvertToken, onVerifyToken }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [query, setQuery] = useState('');

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount ?? 0);

  const getTokenStatusStyle = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'converting':
        return 'text-accent bg-accent/10';
      case 'converted':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getTokenStatusLabel = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Pending';
      case 'converting':
        return 'Converting';
      case 'converted':
        return 'Converted to CCT';
      default:
        return 'Unknown';
    }
  };

  // Tab counts
  const counts = useMemo(() => ({
    pending: tokens.filter(t => t.status === 'pending').length,
    verified: tokens.filter(t => t.status === 'verified').length,
    converted: tokens.filter(t => t.status === 'converted').length,
  }), [tokens]);

  // Filter + search
  const filtered = useMemo(() => {
    const byTab = tokens.filter(t => {
      if (activeTab === 'pending') return t.status === 'pending';
      if (activeTab === 'verified') return t.status === 'verified';
      if (activeTab === 'converted') return t.status === 'converted';
      return true;
    });

    if (!query.trim()) return byTab;

    const q = query.toLowerCase();
    return byTab.filter(t =>
      t.projectName?.toLowerCase().includes(q) ||
      t.ngoName?.toLowerCase().includes(q) ||
      t.tokenId?.toLowerCase().includes(q)
    );
  }, [tokens, activeTab, query]);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Token Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage FTDC promise tokens and CCT conversions
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-warning/10 text-warning">
              <Icon name="Timer" size={14} /> Pending {counts.pending}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success">
              <Icon name="ShieldCheck" size={14} /> Verified {counts.verified}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary">
              <Icon name="ArrowRightCircle" size={14} /> Converted {counts.converted}
            </span>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <nav className="flex gap-6" aria-label="Token status tabs">
            {[
              { id: 'pending', label: 'Pending Verification', count: counts.pending },
              { id: 'verified', label: 'Verified', count: counts.verified },
              { id: 'converted', label: 'Converted to CCT', count: counts.converted },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search NGO, project, token ID"
                className="pl-9 pr-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="outline" size="sm" iconName="BarChart3" iconPosition="left">
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Token list */}
      <div className="divide-y divide-border">
        {filtered.map((token) => {
          const highValue = (token.value ?? 0) >= HIGH_VALUE_INR;

          return (
            <div key={token.id} className="p-5 hover:bg-muted/30 transition-colors">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Left: identity + meta */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 grid place-items-center shrink-0">
                    <Icon name="Coins" size={20} className="text-accent" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold text-foreground tracking-tight">
                        FTDC Token #{token.tokenId}
                      </h4>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getTokenStatusStyle(token.status)}`}
                      >
                        {getTokenStatusLabel(token.status)}
                      </span>
                      {highValue && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-amber-100 text-amber-800">
                          <Icon name="IndianRupee" size={12} /> High value
                        </span>
                      )}
                    </div>

                    <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                      <div><span className="font-medium">Project:</span> {token.projectName}</div>
                      <div><span className="font-medium">NGO:</span> {token.ngoName}</div>
                      <div><span className="font-medium">Value:</span> {formatCurrency(token.value)}</div>
                    </div>

                    <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                      <div>
                        <span className="font-medium">Created:</span>{' '}
                        {new Date(token.createdDate).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </div>
                      <div>
                        <span className="font-medium">Carbon Credits:</span>{' '}
                        {token.carbonCredits} tons CO₂
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {token.status === 'pending' && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onVerifyToken?.(token.id)}
                      iconName="CheckCircle"
                      iconPosition="left"
                    >
                      Verify
                    </Button>
                  )}

                  {token.status === 'verified' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onConvertToken?.(token.id)}
                      iconName="ArrowRightCircle"
                      iconPosition="left"
                    >
                      Convert to CCT
                    </Button>
                  )}

                  <Button variant="ghost" size="sm" iconName="Eye" iconPosition="left">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="p-10 text-center">
          <Icon name="Coins" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-1">No Tokens Found</h3>
          <p className="text-sm text-muted-foreground">
            Try a different tab or adjust your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenManagementSection;
