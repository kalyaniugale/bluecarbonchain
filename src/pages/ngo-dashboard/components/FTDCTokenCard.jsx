import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FTDCTokenCard = ({ tokenData, onDataUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSimulation = async () => {
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      onDataUpload();
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Coins" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">FTDC Tokens</h3>
            <p className="text-sm text-muted-foreground">Field Data Credit Tokens</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{tokenData?.balance?.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Available Tokens</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Token Value</span>
          </div>
          <div className="text-xl font-bold text-foreground">${tokenData?.value?.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Per FTDC Token</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Total Value</span>
          </div>
          <div className="text-xl font-bold text-foreground">
            ${(tokenData?.balance * tokenData?.value)?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-muted-foreground">USD Equivalent</div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Pending Verification</span>
          <span className="font-medium text-foreground">{tokenData?.pending?.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Verified This Month</span>
          <span className="font-medium text-success">{tokenData?.verified?.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Upload</span>
          <span className="font-medium text-foreground">{tokenData?.lastUpload}</span>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="default"
          fullWidth
          loading={isUploading}
          iconName="Upload"
          iconPosition="left"
          onClick={handleUploadSimulation}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading Field Data...' : 'Upload Field Data'}
        </Button>
      </div>
    </div>
  );
};

export default FTDCTokenCard;