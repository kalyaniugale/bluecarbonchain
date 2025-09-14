import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TokenManagementSection = ({ tokens, onConvertToken, onVerifyToken }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const getTokenStatusColor = (status) => {
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

  const filteredTokens = tokens?.filter(token => {
    if (activeTab === 'pending') return token?.status === 'pending';
    if (activeTab === 'verified') return token?.status === 'verified';
    if (activeTab === 'converted') return token?.status === 'converted';
    return true;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const tabs = [
    { id: 'pending', label: 'Pending Verification', count: tokens?.filter(t => t?.status === 'pending')?.length },
    { id: 'verified', label: 'Verified', count: tokens?.filter(t => t?.status === 'verified')?.length },
    { id: 'converted', label: 'Converted to CCT', count: tokens?.filter(t => t?.status === 'converted')?.length }
  ];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Token Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage FTDC promise tokens and CCT conversions
            </p>
          </div>
          
          <Button variant="outline" size="sm" iconName="BarChart3" iconPosition="left">
            View Analytics
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6" aria-label="Token status tabs">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              {tab?.label}
              <span className="ml-2 bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                {tab?.count}
              </span>
            </button>
          ))}
        </nav>
      </div>
      {/* Token List */}
      <div className="divide-y divide-border">
        {filteredTokens?.map((token) => (
          <div key={token?.id} className="p-6 hover:bg-muted/30 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Coins" size={24} className="text-accent" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground">
                      FTDC Token #{token?.tokenId}
                    </h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTokenStatusColor(token?.status)}`}>
                      {getTokenStatusLabel(token?.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Project:</span> {token?.projectName}
                    </div>
                    <div>
                      <span className="font-medium">NGO:</span> {token?.ngoName}
                    </div>
                    <div>
                      <span className="font-medium">Value:</span> {formatCurrency(token?.value)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mt-1">
                    <div>
                      <span className="font-medium">Created:</span> {new Date(token.createdDate)?.toLocaleDateString('en-US')}
                    </div>
                    <div>
                      <span className="font-medium">Carbon Credits:</span> {token?.carbonCredits} tons CO₂
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {token?.status === 'pending' && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onVerifyToken(token?.id)}
                    iconName="CheckCircle"
                    iconPosition="left"
                  >
                    Verify
                  </Button>
                )}
                
                {token?.status === 'verified' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onConvertToken(token?.id)}
                    iconName="ArrowRightCircle"
                    iconPosition="left"
                  >
                    Convert to CCT
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredTokens?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Coins" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Tokens Found</h3>
          <p className="text-muted-foreground">
            No tokens with {tabs?.find(t => t?.id === activeTab)?.label?.toLowerCase()} status found.
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenManagementSection;