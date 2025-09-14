import React, { useEffect } from 'react';
import { useSession } from '../../components/ui/SessionManager';
import AuthenticatedNavBar from '../../components/ui/AuthenticatedNavBar';
import RoleBasedBreadcrumb from '../../components/ui/RoleBasedBreadcrumb';
import TokenFlowStats from './components/TokenFlowStats';
import TokenFlowDiagram from './components/TokenFlowDiagram';
import Icon from '../../components/AppIcon';

const TokenFlowVisualization = () => {
  const { user, logout, isAuthenticated } = useSession();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={32} className="animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <AuthenticatedNavBar user={user} onLogout={logout} />
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <RoleBasedBreadcrumb user={user} />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Icon name="GitBranch" size={24} className="text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Token Flow Visualization</h1>
                <p className="text-muted-foreground">
                  Transparent tracking of carbon credit token progression from FTDC to CCT
                </p>
              </div>
            </div>
          </div>

          {/* Token Flow Statistics */}
          <TokenFlowStats userRole={user?.role} />

          {/* Token Flow Diagram */}
          <TokenFlowDiagram userRole={user?.role} />

          {/* Additional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Process Information */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Info" size={20} className="text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Process Information</h3>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-foreground">FTDC Promise Tokens</strong> are created when NGOs submit verified field data and project documentation.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-foreground">Verification Process</strong> involves third-party audits, satellite imagery confirmation, and environmental impact assessment.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <p>
                    <strong className="text-foreground">Carbon Credit Tokens (CCT)</strong> are the final tradeable tokens issued after successful verification and regulatory approval.
                  </p>
                </div>
              </div>
            </div>

            {/* Role-Specific Benefits */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Users" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  {user?.role === 'ngo' ? 'NGO Benefits' : 
                   user?.role === 'investor'? 'Investor Benefits' : 'Admin Capabilities'}
                </h3>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                {user?.role === 'ngo' && (
                  <>
                    <div className="flex items-start space-x-2">
                      <Icon name="Leaf" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p>Track your environmental projects from data submission to token conversion</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="DollarSign" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p>Monitor token values and potential revenue from carbon credit sales</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p>Ensure transparency and build trust with investors and stakeholders</p>
                    </div>
                  </>
                )}
                {user?.role === 'investor' && (
                  <>
                    <div className="flex items-start space-x-2">
                      <Icon name="TrendingUp" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p>Track your carbon credit investments and portfolio performance</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="Eye" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p>Monitor verification progress and token conversion status</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="BarChart3" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p>Access detailed analytics and impact measurement data</p>
                    </div>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <div className="flex items-start space-x-2">
                      <Icon name="Settings" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p>Oversee system-wide token flows and verification processes</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckSquare" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p>Approve verified projects and authorize token conversions</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="Activity" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <p>Monitor system performance and ensure regulatory compliance</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TokenFlowVisualization;