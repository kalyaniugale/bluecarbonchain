import React from 'react';

const StatBox = ({ label, value, tone }) => (
  <div className="flex-1 bg-card rounded-lg p-4 border border-border">
    <div className={`text-2xl font-bold ${tone || ''} mb-1`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const FTDCTokenCard = ({ tokenData }) => {
  const { balance = 0, pending = 0, verified = 0 } = tokenData || {};
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Funding (FDCT)</h3>
        <p className="text-xs text-muted-foreground">
          Upload field data per project to receive FDCT. Verified data mints credits.
        </p>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBox
          label="FDCT in Wallet"
          value={balance.toLocaleString()}
          tone="text-primary"
        />
        <StatBox
          label="Pending from New Data"
          value={pending.toLocaleString()}
          tone="text-amber-600"
        />
        <StatBox
          label="Verified Credits"
          value={verified.toLocaleString()}
          tone="text-emerald-600"
        />
      </div>

      <div className="px-4 pb-4 text-xs text-muted-foreground">
        Last upload: {tokenData?.lastUpload || '–'}
      </div>
    </div>
  );
};

export default FTDCTokenCard;
