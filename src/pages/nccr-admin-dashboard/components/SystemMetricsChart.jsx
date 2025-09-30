import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Button from '../../../components/ui/Button';



const SystemMetricsChart = ({ chartData }) => {

  const [chartType, setChartType] = useState('bar');


  const barData = [
    { month: 'Jan', projects: 12, tokens: 45, value: 125000 },
    { month: 'Feb', projects: 18, tokens: 62, value: 180000 },
    { month: 'Mar', projects: 25, tokens: 89, value: 245000 },
    { month: 'Apr', projects: 32, tokens: 112, value: 320000 },
    { month: 'May', projects: 28, tokens: 98, value: 285000 },
    { month: 'Jun', projects: 35, tokens: 125, value: 375000 }
  ];

  const pieData = [
    { name: 'Approved', value: 45, color: '#059669' },
    { name: 'Under Review', value: 28, color: '#4A9B8E' },
    { name: 'Pending', value: 18, color: '#D97706' },
    { name: 'Rejected', value: 9, color: '#DC2626' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.dataKey}:</span>
              <span className="text-foreground font-medium">
                {entry?.dataKey === 'value' 
                  ? `$${entry?.value?.toLocaleString()}` 
                  : entry?.value
                }
              </span>
            </div>
          ))}
        </div>
      );  
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data?.payload?.color }}
            />
            <span className="text-muted-foreground">{data?.name}:</span>
            <span className="text-foreground font-medium">{data?.value} projects</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Metrics</h3>
          <p className="text-sm text-muted-foreground">
            {chartType === 'bar' ? 'Monthly performance overview' : 'Project status distribution'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
            iconName="BarChart3"
            iconPosition="left"
          >
            Bar Chart
          </Button>

          <Button
            variant={chartType === 'pie' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('pie')}
            iconName="PieChart"
            iconPosition="left"
          >
            Pie Chart
          </Button>
        </div>
      </div>
      <div className="h-80">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.2)" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="projects" fill="#2D5A3D" radius={[4, 4, 0, 0]} />
              <Bar dataKey="tokens" fill="#4A9B8E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* Legend on right side */}
      <div className="flex flex-col justify-center space-y-3 ml-6">
        {pieData.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-foreground font-medium">{entry.name}</span>
            <span className="text-sm text-muted-foreground">({entry.value})</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SystemMetricsChart;