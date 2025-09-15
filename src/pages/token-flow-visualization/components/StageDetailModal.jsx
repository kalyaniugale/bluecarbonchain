import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StageDetailModal = ({ stage, isOpen, onClose, userRole }) => {
  if (!isOpen || !stage) return null;

  const getRoleSpecificContent = (stage, userRole) => {
    const baseContent = {
      promise: {
        requirements: [
          "Submit field data documentation",
          "Provide GPS coordinates and area measurements",
          "Upload photographic evidence",
          "Complete environmental impact assessment"
        ],
        responsibilities: {
          ngo: "Upload accurate field data and maintain project documentation",
          investor: "Review project proposals and make investment decisions",
          admin: "Validate submitted data and ensure compliance standards"
        },
        timeline: "1-2 weeks for initial token creation"
      },
      verification: {
        requirements: [
          "Third-party verification audit",
          "Satellite imagery confirmation",
          "Local community validation",
          "Environmental impact verification"
        ],
        responsibilities: {
          ngo: "Provide additional documentation as requested by verifiers",
          investor: "Monitor verification progress and provide feedback",
          admin: "Coordinate verification process and approve verified projects"
        },
        timeline: "4-8 weeks for complete verification"
      },
      conversion: {
        requirements: [
          "Successful verification completion",
          "Final audit approval",
          "Regulatory compliance check",
          "Token minting authorization"
        ],
        responsibilities: {
          ngo: "Maintain project standards and provide ongoing monitoring data",
          investor: "Receive tradeable carbon credit tokens",
          admin: "Execute final token conversion and registry updates"
        },
        timeline: "1-2 weeks for token conversion"
      }
    };

    return baseContent?.[stage?.type] || {};
  };

  const content = getRoleSpecificContent(stage, userRole);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${stage?.type === 'promise' ? 'bg-primary/10 text-primary' : 
                stage?.type === 'verification'? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'}
            `}>
              <Icon 
                name={stage?.type === 'promise' ? 'FileText' : stage?.type === 'verification' ? 'Shield' : 'Coins'} 
                size={24} 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{stage?.title}</h2>
              <p className="text-sm text-muted-foreground">Stage Details & Requirements</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stage Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{stage?.description}</p>
          </div>

          {/* Current Status */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-foreground">Current Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{stage?.tokenCount?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground"> ₹{stage?.totalValue?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{stage?.timeline || 'N/A'}</div>
                <div className="text-sm text-muted-foreground">Timeline</div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          {content?.requirements && (
            <div>
              <h4 className="font-medium mb-3 text-foreground">Requirements</h4>
              <ul className="space-y-2">
                {content?.requirements?.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Role-Specific Responsibilities */}
          {content?.responsibilities && (
            <div>
              <h4 className="font-medium mb-3 text-foreground">Your Responsibilities</h4>
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="User" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-accent capitalize mb-1">
                      {userRole} Role
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {content?.responsibilities?.[userRole] || 'Monitor progress and stay informed about updates.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Information */}
          {content?.timeline && (
            <div>
              <h4 className="font-medium mb-3 text-foreground">Expected Timeline</h4>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} className="text-accent" />
                <span>{content?.timeline}</span>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div>
            <h4 className="font-medium mb-3 text-foreground">Progress Status</h4>
            <div className="flex items-center space-x-2">
              <div className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${stage?.status === 'Completed' ? 'bg-success/20 text-success' : 
                  stage?.status === 'In Progress'? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}
              `}>
                {stage?.status}
              </div>
              {stage?.status === 'In Progress' && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span>Processing...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StageDetailModal;