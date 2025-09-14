import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FTDCTokenPurchase = ({ onPurchaseComplete, availableBalance }) => {
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const tokenPrice = 25; // USD per FTDC token
  const calculatedTokens = purchaseAmount ? Math.floor(parseFloat(purchaseAmount) / tokenPrice) : 0;

  const availableProjects = [
    { id: 'mangrove-revival', name: 'Mangrove Revival Project', location: 'Costa Rica' },
    { id: 'seagrass-conservation', name: 'Seagrass Conservation Initiative', location: 'Philippines' },
    { id: 'coral-restoration', name: 'Coral Reef Restoration', location: 'Indonesia' },
    { id: 'coastal-wetlands', name: 'Coastal Wetlands Protection', location: 'Madagascar' }
  ];

  const handlePurchaseClick = () => {
    if (!purchaseAmount || !selectedProject || parseFloat(purchaseAmount) <= 0) {
      return;
    }
    
    if (parseFloat(purchaseAmount) > availableBalance) {
      return;
    }

    setShowConfirmation(true);
  };

  const confirmPurchase = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const purchaseData = {
      amount: parseFloat(purchaseAmount),
      tokens: calculatedTokens,
      project: availableProjects?.find(p => p?.id === selectedProject),
      timestamp: new Date()?.toISOString(),
      transactionId: `TXN-${Date.now()}`
    };

    onPurchaseComplete(purchaseData);
    
    // Reset form
    setPurchaseAmount('');
    setSelectedProject('');
    setShowConfirmation(false);
    setIsProcessing(false);
  };

  const cancelPurchase = () => {
    setShowConfirmation(false);
  };

  const isValidPurchase = purchaseAmount && 
                         selectedProject && 
                         parseFloat(purchaseAmount) > 0 && 
                         parseFloat(purchaseAmount) <= availableBalance &&
                         calculatedTokens > 0;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Coins" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Purchase FTDC Tokens</h2>
          <p className="text-sm text-muted-foreground">Invest in carbon credit projects</p>
        </div>
      </div>
      {!showConfirmation ? (
        <div className="space-y-6">
          {/* Token Price Info */}
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Current Token Price</span>
              </div>
              <span className="text-lg font-bold text-primary">${tokenPrice} USD</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per FTDC (Field-to-Digital Carbon) Token
            </p>
          </div>

          {/* Available Balance */}
          <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
            <span className="text-sm text-muted-foreground">Available Balance:</span>
            <span className="font-medium text-foreground">${availableBalance?.toLocaleString()} USD</span>
          </div>

          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose a project to invest in...</option>
              {availableProjects?.map((project) => (
                <option key={project?.id} value={project?.id}>
                  {project?.name} - {project?.location}
                </option>
              ))}
            </select>
          </div>

          {/* Purchase Amount */}
          <div>
            <Input
              label="Investment Amount (USD)"
              type="number"
              placeholder="Enter amount to invest"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e?.target?.value)}
              min="1"
              max={availableBalance}
              step="1"
            />
            {purchaseAmount && parseFloat(purchaseAmount) > availableBalance && (
              <p className="text-sm text-error mt-1">
                Amount exceeds available balance
              </p>
            )}
          </div>

          {/* Token Calculation */}
          {calculatedTokens > 0 && (
            <div className="bg-success/5 rounded-lg p-4 border border-success/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">You will receive:</span>
                <div className="text-right">
                  <div className="text-lg font-bold text-success">{calculatedTokens} FTDC</div>
                  <div className="text-xs text-muted-foreground">Tokens</div>
                </div>
              </div>
            </div>
          )}

          {/* Purchase Button */}
          <Button
            variant="default"
            size="lg"
            fullWidth
            disabled={!isValidPurchase}
            onClick={handlePurchaseClick}
            iconName="ShoppingCart"
            iconPosition="left"
          >
            Purchase FTDC Tokens
          </Button>
        </div>
      ) : (
        /* Confirmation Modal */
        (<div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="AlertTriangle" size={32} className="text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Confirm Purchase</h3>
            <p className="text-sm text-muted-foreground">
              Please review your purchase details before confirming
            </p>
          </div>
          <div className="bg-background rounded-lg border border-border p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Project:</span>
              <span className="font-medium text-foreground">
                {availableProjects?.find(p => p?.id === selectedProject)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Investment Amount:</span>
              <span className="font-medium text-foreground">${parseFloat(purchaseAmount)?.toLocaleString()} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">FTDC Tokens:</span>
              <span className="font-medium text-primary">{calculatedTokens} tokens</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="text-muted-foreground">Token Price:</span>
              <span className="font-medium text-foreground">${tokenPrice} USD each</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={cancelPurchase}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={confirmPurchase}
              loading={isProcessing}
              iconName="Check"
              iconPosition="left"
            >
              {isProcessing ? 'Processing...' : 'Confirm Purchase'}
            </Button>
          </div>
        </div>)
      )}
    </div>
  );
};

export default FTDCTokenPurchase;