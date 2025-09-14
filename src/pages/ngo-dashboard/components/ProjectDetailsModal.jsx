import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'Play';
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'paused':
        return 'Pause';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'completed':
        return 'text-primary bg-primary/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'paused':
        return 'text-muted-foreground bg-muted/50';
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FolderOpen" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{project?.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                  <Icon name={getStatusIcon(project?.status)} size={12} className="mr-1" />
                  {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)}
                </div>
                <span className="text-xs text-muted-foreground">ID: {project?.id}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Icon name="X" size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Project Description */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Project Description</h3>
              <p className="text-muted-foreground">{project?.description}</p>
            </div>

            {/* Key Information Grid */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Key Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Location</span>
                  </div>
                  <div className="text-muted-foreground">{project?.location}</div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Tag" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Project Type</span>
                  </div>
                  <div className="text-muted-foreground">{project?.type}</div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Maximize2" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Size</span>
                  </div>
                  <div className="text-muted-foreground">{project?.size} hectares</div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Leaf" size={16} className="text-success" />
                    <span className="text-sm font-medium text-foreground">Expected Credits</span>
                  </div>
                  <div className="text-muted-foreground">{project?.expectedCredits?.toLocaleString()} CCT</div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Start Date</span>
                  </div>
                  <div className="text-muted-foreground">
                    {new Date(project?.startDate)?.toLocaleDateString()}
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="CalendarCheck" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">End Date</span>
                  </div>
                  <div className="text-muted-foreground">
                    {new Date(project?.endDate)?.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Methodology */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Methodology</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="FileCheck" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Certification Standard</span>
                </div>
                <div className="text-muted-foreground">{project?.methodology}</div>
              </div>
            </div>

            {/* Additional Notes */}
            {project?.additionalNotes && (
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Additional Notes</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-muted-foreground">{project?.additionalNotes}</p>
                </div>
              </div>
            )}

            {/* Project Timeline */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="PlayCircle" size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Project Created</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(project?.createdAt || project?.startDate)?.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-warning" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Last Updated</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(project?.lastUpdated || project?.startDate)?.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-4 border-t border-border">
            <button
              onClick={onClose}
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Close
            </button>
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Icon name="Edit" size={16} />
              <span>Edit Project</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;