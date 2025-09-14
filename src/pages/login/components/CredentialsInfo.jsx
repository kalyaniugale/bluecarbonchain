import React from 'react';
import Icon from '../../../components/AppIcon';
import { useSession } from '../../../components/ui/SessionManager';

const CredentialsInfo = () => {
  const { login } = useSession();

  const credentials = [
    {
      role: 'ngo',
      roleLabel: 'NGO User',
      username: 'ngo_user',
      password: 'ngo123',
      icon: 'TreePine',
      color: 'text-success',
      email: 'ngo@example.com',
      name: 'NGO User'
    },
    {
      role: 'investor',
      roleLabel: 'Investor',
      username: 'investor_user',
      password: 'invest123',
      icon: 'TrendingUp',
      color: 'text-accent',
      email: 'investor@example.com',
      name: 'Investor User'
    },
    {
      role: 'admin',
      roleLabel: 'Admin',
      username: 'admin_user',
      password: 'admin123',
      icon: 'Shield',
      color: 'text-secondary',
      email: 'admin@example.com',
      name: 'Admin User'
    }
  ];

  const handleInstantLogin = (cred) => {
    const userData = {
      id: Date.now(),
      username: cred.username,
      name: cred.name,
      email: cred.email,
      role: cred.role,
      loginTime: new Date().toISOString()
    };
    // Directly log in via your SessionManager
    login(userData);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-muted/50 rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Info" size={18} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Demo Credentials ( click )</h3>
        </div>

        <div className="space-y-3">
          {credentials.map((cred, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleInstantLogin(cred)}
              className="w-full flex items-center justify-between p-3 bg-card rounded-md border border-border/50 hover:bg-muted transition focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <div className="flex items-center space-x-3">
                <Icon name={cred.icon} size={16} className={cred.color} />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{cred.roleLabel}</p>
                  <p className="text-xs text-muted-foreground">{cred.username}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Password:</p>
                <p className="text-sm font-mono text-foreground">{cred.password}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-accent/10 rounded-md border border-accent/20">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={14} className="text-accent mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Click any card to log in instantly as that user role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialsInfo;
