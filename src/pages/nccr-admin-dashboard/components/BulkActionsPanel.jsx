import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsPanel = ({ selectedItems, onBulkApprove, onBulkReject, onClearSelection }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBulkAction = async (action) => {
    setIsProcessing(true);
    
    try {
      if (action === 'approve') {
        await onBulkApprove(selectedItems);
      } else if (action === 'reject') {
        await onBulkReject(selectedItems);
      }
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedItems?.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-[320px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="CheckSquare" size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedItems?.length} item{selectedItems?.length > 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Choose an action to apply to all selected items
              </p>
            </div>
          </div>
          
          <button
            onClick={onClearSelection}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            aria-label="Clear selection"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => handleBulkAction('approve')}
            loading={isProcessing}
            iconName="Check"
            iconPosition="left"
            className="flex-1"
          >
            Approve All
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleBulkAction('reject')}
            loading={isProcessing}
            iconName="X"
            iconPosition="left"
            className="flex-1"
          >
            Reject All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsPanel;