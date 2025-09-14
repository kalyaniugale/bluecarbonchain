import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExistingProjectsList = ({ projects, onViewProject }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

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

  const filteredProjects = projects?.filter(project => 
    filter === 'all' || project?.status === filter
  );

  const sortedProjects = filteredProjects?.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b?.lastUpdated || b?.startDate) - new Date(a?.lastUpdated || a?.startDate);
      case 'name':
        return (a?.name || '')?.localeCompare(b?.name || '');
      case 'status':
        return (a?.status || '')?.localeCompare(b?.status || '');
      default:
        return 0;
    }
  });

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FolderOpen" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Existing Projects</h3>
            <p className="text-sm text-muted-foreground">
              {projects?.length || 0} projects total
            </p>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
      {/* Projects List */}
      <div className="space-y-3">
        {sortedProjects?.length > 0 ? (
          sortedProjects?.map((project, index) => (
            <div
              key={project?.id || index}
              className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => onViewProject?.(project)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{project?.name}</h4>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                      <Icon name={getStatusIcon(project?.status)} size={12} className="mr-1" />
                      {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {project?.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <div className="font-medium text-foreground">
                        {project?.type}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <div className="font-medium text-foreground">
                        {project?.location}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <div className="font-medium text-foreground">
                        {project?.size} hectares
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected Credits:</span>
                      <div className="font-medium text-foreground">
                        {project?.expectedCredits?.toLocaleString()} CCT
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      Started: {new Date(project?.startDate)?.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last updated: {new Date(project?.lastUpdated || project?.startDate)?.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="FolderOpen" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">No Projects Found</h4>
            <p className="text-muted-foreground text-sm">
              {filter === 'all' ? 'You haven\'t created any projects yet.' : `No ${filter} projects found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistingProjectsList;