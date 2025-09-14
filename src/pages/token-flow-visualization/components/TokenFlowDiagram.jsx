import React, { useState } from 'react';
import TokenStageCard from './TokenStageCard';
import StageDetailModal from './StageDetailModal';

const TokenFlowDiagram = ({ userRole }) => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTokenStages = (role) => {
    const baseStages = [
      {
        id: 1,
        type: 'promise',
        title: 'FTDC Promise Token',
        description: 'Initial token creation based on field data submission and project documentation. Represents future carbon credit potential.',
        tokenCount: role === 'ngo' ? 8450 : role === 'investor' ? 15670 : 45230,
        totalValue: role === 'ngo' ? 84500 : role === 'investor' ? 156700 : 452300,
        timeline: '1-2 weeks',
        status: 'Completed',
        showConnector: true
      },
      {
        id: 2,
        type: 'verification',
        title: 'Verification Process',
        description: 'Third-party verification of project data, satellite imagery confirmation, and environmental impact assessment.',
        tokenCount: role === 'ngo' ? 6230 : role === 'investor' ? 12340 : 34560,
        totalValue: role === 'ngo' ? 74760 : role === 'investor' ? 148080 : 415680,
        timeline: '4-8 weeks',
        status: 'In Progress',
        showConnector: true
      },
      {
        id: 3,
        type: 'conversion',
        title: 'Carbon Credit Token (CCT)',
        description: 'Final tradeable carbon credit tokens after successful verification and regulatory approval.',
        tokenCount: role === 'ngo' ? 4890 : role === 'investor' ? 9870 : 28940,
        totalValue: role === 'ngo' ? 68460 : role === 'investor' ? 138180 : 405160,
        timeline: '1-2 weeks',
        status: 'Pending',
        showConnector: false
      }
    ];

    return baseStages;
  };

  const stages = getTokenStages(userRole);

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStage(null);
  };

  const getStageStatus = (stageId) => {
    if (stageId === 1) return { isActive: false, isCompleted: true };
    if (stageId === 2) return { isActive: true, isCompleted: false };
    return { isActive: false, isCompleted: false };
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">Token Flow Visualization</h2>
        <p className="text-muted-foreground">
          Track the progression of carbon credit tokens from initial creation to final conversion. 
          Click on any stage for detailed information.
        </p>
      </div>
      {/* Flow Diagram - Desktop */}
      <div className="hidden lg:flex items-center justify-center space-x-16 mb-8">
        {stages?.map((stage) => {
          const { isActive, isCompleted } = getStageStatus(stage?.id);
          return (
            <TokenStageCard
              key={stage?.id}
              stage={stage}
              isActive={isActive}
              isCompleted={isCompleted}
              onClick={() => handleStageClick(stage)}
            />
          );
        })}
      </div>
      {/* Flow Diagram - Mobile (Vertical) */}
      <div className="lg:hidden space-y-6 mb-8">
        {stages?.map((stage) => {
          const { isActive, isCompleted } = getStageStatus(stage?.id);
          return (
            <div key={stage?.id} className="flex justify-center">
              <TokenStageCard
                stage={stage}
                isActive={isActive}
                isCompleted={isCompleted}
                onClick={() => handleStageClick(stage)}
              />
            </div>
          );
        })}
      </div>
      {/* Flow Legend */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <h3 className="text-sm font-medium text-foreground mb-3">Legend</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Completed Stage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Active Stage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
            <span className="text-muted-foreground">Pending Stage</span>
          </div>
        </div>
      </div>
      {/* Stage Detail Modal */}
      <StageDetailModal
        stage={selectedStage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userRole={userRole}
      />
    </div>
  );
};

export default TokenFlowDiagram;