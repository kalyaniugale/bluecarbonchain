import React, { useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const Pill = ({ tone = 'gray', children }) => {
  const map = {
    emerald: 'bg-emerald-100 text-emerald-800',
    amber:   'bg-amber-100 text-amber-800',
    blue:    'bg-blue-100 text-blue-800',
    rose:    'bg-rose-100 text-rose-800',
    gray:    'bg-gray-200 text-gray-800',
  };
  return <span className={`px-2 py-1 rounded-full text-xs ${map[tone] || map.gray}`}>{children}</span>;
};

const stageTone = (s) => (s === 'Released' ? 'emerald' : s === 'Escrow' ? 'amber' : 'gray');
const statusTone = (s) => (s === 'Completed' ? 'emerald' : s === 'In Progress' ? 'blue' : 'rose');

const FundingTransactionsCard = ({ transactions = [] }) => {
  const rows = Array.isArray(transactions) ? transactions : [];

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, r) => {
        const tokens = Number(r.tokens) || 0;
        const total  = Number(r.totalINR) || (Number(r.pricePerTokenINR) || 0) * tokens;
        acc.tokens += tokens;
        acc.amount += total;
        return acc;
      },
      { tokens: 0, amount: 0 }
    );
  }, [rows]);

  return (
    <section className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Funding &amp; Issuance</h3>
          <p className="text-xs text-muted-foreground">FDCT sold to investors • Escrow → Released</p>
        </div>
        <button
          className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted/40"
          onClick={() => alert('Coming soon: full ledger')}
        >
          <Icon name="ExternalLink" size={14} /> View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 text-foreground sticky top-0">
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
            {rows.map((tx) => {
              const tokens = Number(tx.tokens) || 0;
              const ppt    = Number(tx.pricePerTokenINR) || 0;
              const total  = Number(tx.totalINR) || tokens * ppt;
              return (
                <tr key={tx.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-4 py-3 whitespace-nowrap">{tx.date ? new Date(tx.date).toLocaleDateString('en-IN') : '-'}</td>
                  <td className="px-4 py-3">{tx.investor || '-'}</td>
                  <td className="px-4 py-3 truncate max-w-[220px]" title={tx.projectName}>{tx.projectName || '-'}</td>
                  <td className="px-4 py-3 text-right">{tokens.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-right">{ppt ? ppt.toLocaleString('en-IN') : '-'}</td>
                  <td className="px-4 py-3 text-right">{total ? inr.format(total) : '-'}</td>
                  <td className="px-4 py-3"><Pill tone={stageTone(tx.stage)}>{tx.stage || '—'}</Pill></td>
                  <td className="px-4 py-3"><Pill tone={statusTone(tx.status)}>{tx.status || '—'}</Pill></td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-10 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="Wallet" size={20} className="text-muted-foreground" />
                    <p>No investor transactions yet.</p>
                    <button
                      onClick={() => alert('Demo: invite investors')}
                      className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground"
                    >
                      <Icon name="Send" size={14} /> Invite investors
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

          {rows.length > 0 && (
            <tfoot className="border-t border-border bg-muted/30">
              <tr>
                <td className="px-4 py-3 text-xs text-muted-foreground" colSpan={3}>Totals</td>
                <td className="px-4 py-3 text-right font-medium">{totals.tokens.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3" />
                <td className="px-4 py-3 text-right font-medium">{inr.format(totals.amount)}</td>
                <td className="px-4 py-3" colSpan={2} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <div className="p-4 text-[11px] text-muted-foreground">
        Funds in <span className="font-medium">Escrow</span> are released in stages as field data is verified by NCCR partners.
      </div>
    </section>
  );
};

export default FundingTransactionsCard;
