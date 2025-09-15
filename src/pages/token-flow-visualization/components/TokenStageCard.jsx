import React from 'react';
import Icon from '../../../components/AppIcon';

const TokenStageCard = ({ stage, isActive, isCompleted, onClick }) => {
  const getStageIcon = (stageType) => {
    switch (stageType) {
      case 'promise':
        return 'FileText';
      case 'verification':
        return 'Shield';
      case 'conversion':
        return 'Coins';
      default:
        return 'Circle';
    }
  };

  const getStageColor = (stageType, isActive, isCompleted) => {
    if (isCompleted) return 'text-success bg-success/10 border-success/20';
    if (isActive) return 'text-accent bg-accent/10 border-accent/20';
    return 'text-muted-foreground bg-muted border-border';
  };

  const getConnectorColor = (isCompleted) => {
    return isCompleted ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Stage Card */}
      <div
        onClick={onClick}
        className={`
          relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 min-w-[280px] max-w-[320px]
          ${getStageColor(stage?.type, isActive, isCompleted)}
        `}
      >
        {/* Stage Icon */}
        <div className="flex justify-center mb-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
            ${isCompleted ? 'bg-success text-white' : isActive ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}
          `}>
            <Icon name={getStageIcon(stage?.type)} size={28} />
          </div>
        </div>

        {/* Stage Title */}
        <h3 className="text-lg font-semibold text-center mb-2">
          {stage?.title}
        </h3>

        {/* Stage Description */}
        <p className="text-sm text-center text-muted-foreground mb-4 leading-relaxed">
          {stage?.description}
        </p>

        {/* Stage Stats */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">Tokens:</span>
            <span className="text-sm font-semibold">{stage?.tokenCount?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">Value:</span>
            <span className="text-sm font-semibold">₹{stage?.totalValue?.toLocaleString()}</span>
          </div>
          {stage?.timeline && (
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-muted-foreground">Timeline:</span>
              <span className="text-sm font-semibold">{stage?.timeline}</span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="mt-4 flex justify-center">
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${isCompleted ? 'bg-success/20 text-success' : isActive ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}
          `}>
            {stage?.status}
          </span>
        </div>

        {/* Completion Indicator */}
        {isCompleted && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={14} color="white" />
          </div>
        )}
      </div>
      {/* Connector Line (for desktop) */}
      {stage?.showConnector && (
        <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-1 transform -translate-y-1/2">
          <div className={`w-full h-full rounded-full transition-all duration-500 ${getConnectorColor(isCompleted)}`}>
            {isActive && (
              <div className="w-full h-full bg-accent rounded-full animate-pulse"></div>
            )}
          </div>
          <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-0 h-0 border-l-4 border-t-2 border-b-2 border-transparent ${isCompleted ? 'border-l-success' : isActive ? 'border-l-accent' : 'border-l-border'}`}></div>
        </div>
      )}
      {/* Mobile Connector (vertical) */}
      {stage?.showConnector && (
        <div className="lg:hidden w-1 h-8 mt-4">
          <div className={`w-full h-full rounded-full transition-all duration-500 ${getConnectorColor(isCompleted)}`}>
            {isActive && (
              <div className="w-full h-full bg-accent rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenStageCard;