import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectListingsTable = ({ projects, onProjectSelect }) => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProjects = [...projects]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'investmentAmount' || sortField === 'carbonPotential') {
      aValue = parseFloat(aValue?.toString()?.replace(/[,$]/g, ''));
      bValue = parseFloat(bValue?.toString()?.replace(/[,$]/g, ''));
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const toggleExpanded = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'completed':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="TrendingUp" size={24} className="text-primary" />
          <span>Investment Opportunities</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Discover carbon credit projects ready for investment
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Project Name</span>
                  <Icon name={getSortIcon('name')} size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Location</span>
                  <Icon name={getSortIcon('location')} size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('carbonPotential')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Carbon Potential</span>
                  <Icon name={getSortIcon('carbonPotential')} size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('investmentAmount')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Investment</span>
                  <Icon name={getSortIcon('investmentAmount')} size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-center p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects?.map((project) => (
              <React.Fragment key={project?.id}>
                <tr className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Leaf" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{project?.name}</div>
                        <div className="text-sm text-muted-foreground">{project?.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Icon name="MapPin" size={16} />
                      <span>{project?.location}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground">{project?.carbonPotential}</div>
                    <div className="text-sm text-muted-foreground">tons CO₂</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground"> ₹ {project?.investmentAmount?.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">INR</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                      {project?.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(project?.id)}
                        iconName={expandedProject === project?.id ? "ChevronUp" : "ChevronDown"}
                        iconPosition="right"
                      >
                        Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onProjectSelect(project)}
                        iconName="Eye"
                        iconPosition="left"
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {expandedProject === project?.id && (
                  <tr className="border-t border-border bg-muted/20">
                    <td colSpan="6" className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                            <Icon name="BarChart3" size={16} className="text-primary" />
                            <span>Impact Metrics</span>
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Biodiversity Score:</span>
                              <span className="font-medium text-foreground">{project?.details?.biodiversityScore}/10</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Community Impact:</span>
                              <span className="font-medium text-foreground">{project?.details?.communityImpact}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Area Coverage:</span>
                              <span className="font-medium text-foreground">{project?.details?.areaCoverage}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                            <Icon name="Shield" size={16} className="text-accent" />
                            <span>Verification</span>
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Verification Status:</span>
                              <span className={`font-medium ${project?.details?.verificationStatus === 'Verified' ? 'text-success' : 'text-warning'}`}>
                                {project?.details?.verificationStatus}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Certifying Body:</span>
                              <span className="font-medium text-foreground">{project?.details?.certifyingBody}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Audit:</span>
                              <span className="font-medium text-foreground">{project?.details?.lastAudit}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                            <Icon name="DollarSign" size={16} className="text-secondary" />
                            <span>Expected Returns</span>
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">ROI Projection:</span>
                              <span className="font-medium text-success">{project?.details?.expectedReturns?.roi}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Payback Period:</span>
                              <span className="font-medium text-foreground">{project?.details?.expectedReturns?.paybackPeriod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Risk Level:</span>
                              <span className={`font-medium ${project?.details?.expectedReturns?.riskLevel === 'Low' ? 'text-success' : project?.details?.expectedReturns?.riskLevel === 'Medium' ? 'text-warning' : 'text-error'}`}>
                                {project?.details?.expectedReturns?.riskLevel}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">{project?.details?.description}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectListingsTable;