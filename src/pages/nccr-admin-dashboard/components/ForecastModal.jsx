import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const mockForecast = {
  capture: [
    { year: 2025, credits: 150 },
    { year: 2026, credits: 320 },
    { year: 2027, credits: 550 },
    { year: 2028, credits: 820 },
    { year: 2029, credits: 1100 },
    { year: 2030, credits: 1350 }
  ],
  confidence: 0.82,
  suitability: 'High',
  factors: [
    { label: 'Survival Probability', value: '82%', icon: 'Leaf' },
    { label: 'Storm Impact Risk', value: '15%', icon: 'CloudRain' },
    { label: 'Data Quality Score', value: '91%', icon: 'CheckCircle' }
  ]
};

const ForecastModal = ({ isOpen, onClose, projectName }) => {
  if (!isOpen) return null;

  // OPTIONAL: prevent background scroll
  // useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm
                 flex items-center justify-center p-4 md:p-6"
      aria-modal="true" role="dialog"
    >
      {/* Modal shell constrained to viewport height, internal scroll */}
      <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-3xl
                      max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header stays fixed inside modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 grid place-items-center">
              <Icon name="LineChart" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Forecast — {projectName}
              </h3>
              <p className="text-xs text-muted-foreground">
                Multi-factor estimate: capture, verification confidence, growth/risk factors
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-muted" aria-label="Close">
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="p-5 overflow-y-auto">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg border border-border p-3">
              <div className="text-xs text-muted-foreground">Estimated by 2030</div>
              <div className="text-xl font-semibold">1,350 tons CO₂</div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="text-xs text-muted-foreground">Verification Confidence</div>
              <div className="text-xl font-semibold">{(mockForecast.confidence * 100).toFixed(0)}%</div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="text-xs text-muted-foreground">Growth Suitability</div>
              <div className="text-xl font-semibold">{mockForecast.suitability}</div>
            </div>
          </div>

          {/* Capture chart */}
          <h4 className="text-sm font-medium mb-2">Carbon Capture Projection</h4>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockForecast.capture}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                <XAxis dataKey="year" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="credits" stroke="#16a34a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Factors */}
          <h4 className="text-sm font-medium mb-2">Verification & Growth Factors</h4>
          <ul className="space-y-2 text-sm">
            {mockForecast.factors.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <Icon name={f.icon} size={16} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{f.label}:</span>
                <span className="text-muted-foreground">{f.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer sticks to bottom of modal, not page */}
        <div className="px-5 py-4 border-t border-border flex justify-end gap-2 shrink-0">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button variant="default" iconName="Download" iconPosition="left"
            onClick={() => alert('Demo: export forecast')}>
            Export Forecast
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForecastModal;
