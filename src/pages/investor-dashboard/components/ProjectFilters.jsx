import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectFilters = ({ onFiltersChange, totalProjects, filteredCount }) => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    carbonType: '',
    minInvestment: '',
    maxInvestment: '',
    status: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const locationOptions = [
    'All Locations',
    'Costa Rica',
    'Philippines',
    'Indonesia',
    'Madagascar',
    'Brazil',
    'Thailand'
  ];

  const carbonTypeOptions = [
    'All Types',
    'Mangrove Restoration',
    'Seagrass Conservation',
    'Coral Reef Protection',
    'Coastal Wetlands',
    'Marine Protected Areas'
  ];

  const statusOptions = [
    'All Status',
    'Active',
    'Pending',
    'Completed'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      location: '',
      carbonType: '',
      minInvestment: '',
      maxInvestment: '',
      status: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border mb-6">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Filter Projects</h3>
            <span className="text-sm text-muted-foreground">
              ({filteredCount} of {totalProjects} projects)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {isExpanded ? 'Less' : 'More'} Filters
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* Always visible search */}
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search projects by name or description..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Quick filter buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {locationOptions?.slice(1, 4)?.map((location) => (
            <Button
              key={location}
              variant={filters?.location === location ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('location', filters?.location === location ? '' : location)}
            >
              {location}
            </Button>
          ))}
        </div>

        {/* Expanded filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <select
                value={filters?.location}
                onChange={(e) => handleFilterChange('location', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {locationOptions?.map((option) => (
                  <option key={option} value={option === 'All Locations' ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Carbon Type</label>
              <select
                value={filters?.carbonType}
                onChange={(e) => handleFilterChange('carbonType', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {carbonTypeOptions?.map((option) => (
                  <option key={option} value={option === 'All Types' ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select
                value={filters?.status}
                onChange={(e) => handleFilterChange('status', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {statusOptions?.map((option) => (
                  <option key={option} value={option === 'All Status' ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Min Investment (USD)</label>
              <Input
                type="number"
                placeholder="0"
                value={filters?.minInvestment}
                onChange={(e) => handleFilterChange('minInvestment', e?.target?.value)}
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Max Investment (USD)</label>
              <Input
                type="number"
                placeholder="1000000"
                value={filters?.maxInvestment}
                onChange={(e) => handleFilterChange('maxInvestment', e?.target?.value)}
                min="0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;