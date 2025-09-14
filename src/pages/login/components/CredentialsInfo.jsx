import React from 'react';
import Icon from '../../../components/AppIcon';

const CredentialsInfo = () => {
  const credentials = [
    {
      role: 'NGO User',
      username: 'ngo_user',
      password: 'ngo123',
      icon: 'TreePine',
      color: 'text-success'
    },
    {
      role: 'Investor',
      username: 'investor_user',
      password: 'invest123',
      icon: 'TrendingUp',
      color: 'text-accent'
    },
    {
      role: 'Admin',
      username: 'admin_user',
      password: 'admin123',
      icon: 'Shield',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-muted/50 rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Info" size={18} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Demo Credentials</h3>
        </div>
        
        <div className="space-y-3">
          {credentials?.map((cred, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-card rounded-md border border-border/50">
              <div className="flex items-center space-x-3">
                <Icon name={cred?.icon} size={16} className={cred?.color} />
                <div>
                  <p className="text-sm font-medium text-foreground">{cred?.role}</p>
                  <p className="text-xs text-muted-foreground">{cred?.username}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Password:</p>
                <p className="text-sm font-mono text-foreground">{cred?.password}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-accent/10 rounded-md border border-accent/20">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={14} className="text-accent mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Use these credentials to explore different user roles and their respective dashboards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialsInfo;