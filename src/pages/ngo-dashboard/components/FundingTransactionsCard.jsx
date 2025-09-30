import React from 'react';

const stagePill = (stage) => {
  const base = 'px-2 py-1 rounded-full text-xs';
  if (stage === 'Released') return `${base} bg-emerald-100 text-emerald-800`;
  if (stage === 'Escrow')   return `${base} bg-amber-100 text-amber-800`;
  return `${base} bg-gray-200 text-gray-800`;
};

const statusPill = (status) => {
  const base = 'px-2 py-1 rounded-full text-xs';
  if (status === 'Completed')   return `${base} bg-emerald-100 text-emerald-800`;
  if (status === 'In Progress') return `${base} bg-blue-100 text-blue-800`;
  return `${base} bg-rose-100 text-rose-800`;
};

const FundingTransactionsCard = ({ transactions = [] }) => {
  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Funding & Issuance</h3>
        <p className="text-xs text-muted-foreground">FDCT sold to investors • Escrow → Released</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Investor</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium text-right">Tokens</th>
              <th className="px-4 py-3 font-medium text-right">₹ / Token</th>
              <th className="px-4 py-3 font-medium text-right">Total (₹)</th>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-t border-border">
                <td className="px-4 py-3">{new Date(tx.date).toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3">{tx.investor}</td>
                <td className="px-4 py-3 truncate max-w-[180px]" title={tx.projectName}>{tx.projectName}</td>
                <td className="px-4 py-3 text-right">{Number.isFinite(tx.tokens) ? tx.tokens.toLocaleString('en-IN') : '0'}</td>
                <td className="px-4 py-3 text-right">{Number.isFinite(tx.pricePerTokenINR) ? tx.pricePerTokenINR.toLocaleString('en-IN') : '0'}</td>
                <td className="px-4 py-3 text-right">{Number.isFinite(tx.totalINR) ? tx.totalINR.toLocaleString('en-IN') : '0'}</td>
                <td className="px-4 py-3"><span className={stagePill(tx.stage)}>{tx.stage}</span></td>
                <td className="px-4 py-3"><span className={statusPill(tx.status)}>{tx.status}</span></td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-muted-foreground">
                  No investor transactions yet. When FDCT are sold, they’ll appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 text-xs text-muted-foreground">
        Funds in <span className="font-medium">Escrow</span> are released in stages as data is verified.
      </div>
    </div>
  );
};

export default FundingTransactionsCard;
