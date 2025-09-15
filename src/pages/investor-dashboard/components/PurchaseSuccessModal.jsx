import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PurchaseSuccessModal = ({ isOpen, onClose, purchaseData }) => {
  const navigate = useNavigate();

  if (!isOpen || !purchaseData) return null;

  const handleViewTokenFlow = () => {
    navigate('/token-flow-visualization');
  };

  const handleContinueInvesting = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Purchase Successful!</h2>
            <p className="text-sm text-muted-foreground">
              Your FTDC tokens have been successfully purchased and added to your portfolio.
            </p>
          </div>

          {/* Purchase Details */}
          <div className="bg-background rounded-lg border border-border p-4 mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Receipt" size={16} className="text-primary" />
              <span>Transaction Details</span>
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-foreground">{purchaseData?.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project:</span>
                <span className="font-medium text-foreground">{purchaseData?.project?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="text-foreground">{purchaseData?.project?.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Investment Amount:</span>
                <span className="font-medium text-foreground">₹{purchaseData?.amount?.toLocaleString()} INR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">FTDC Tokens Received:</span>
                <span className="font-bold text-primary">{purchaseData?.tokens} tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Date:</span>
                <span className="text-foreground">
                  {new Date(purchaseData.timestamp)?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/5 rounded-lg p-4 mb-6 border border-primary/20">
            <h3 className="font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="Lightbulb" size={16} className="text-primary" />
              <span>What's Next?</span>
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start space-x-2">
                <Icon name="ArrowRight" size={12} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Your tokens will undergo field verification</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="ArrowRight" size={12} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Track progress in the Token Flow visualization</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="ArrowRight" size={12} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Receive Carbon Credit Tokens (CCT) upon completion</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleViewTokenFlow}
              iconName="GitBranch"
              iconPosition="left"
            >
              View Token Flow Progress
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={handleContinueInvesting}
              iconName="Plus"
              iconPosition="left"
            >
              Continue Investing
            </Button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessModal;