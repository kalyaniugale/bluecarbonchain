import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CreateProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    location: '',
    size: '',
    expectedCredits: '',
    startDate: '',
    endDate: '',
    methodology: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    'Mangrove Restoration',
    'Seagrass Conservation',
    'Salt Marsh Restoration',
    'Kelp Forest Conservation',
    'Coastal Wetland Restoration',
    'Blue Carbon Ecosystem Protection',
    'Marine Protected Area',
    'Oyster Reef Restoration'
  ];

  const methodologies = [
    'Verified Carbon Standard (VCS)',
    'Gold Standard',
    'Climate Action Reserve',
    'American Carbon Registry',
    'Plan Vivo'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (!formData?.type) {
      newErrors.type = 'Project type is required';
    }

    if (!formData?.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData?.size || parseFloat(formData?.size) <= 0) {
      newErrors.size = 'Valid project size is required';
    }

    if (!formData?.expectedCredits || parseFloat(formData?.expectedCredits) <= 0) {
      newErrors.expectedCredits = 'Expected carbon credits is required';
    }

    if (!formData?.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData?.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData?.startDate && new Date(formData?.endDate) <= new Date(formData?.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (!formData?.methodology) {
      newErrors.methodology = 'Methodology is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const projectData = {
        ...formData,
        size: parseFloat(formData?.size),
        expectedCredits: parseInt(formData?.expectedCredits),
        status: 'pending',
        createdAt: new Date()?.toISOString(),
        lastUpdated: new Date()?.toISOString(),
        id: Date.now()?.toString() // Temporary ID generation
      };

      await onSubmit?.(projectData);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        type: '',
        location: '',
        size: '',
        expectedCredits: '',
        startDate: '',
        endDate: '',
        methodology: '',
        additionalNotes: ''
      });
      
      onClose?.();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Create New Project</h2>
              <p className="text-sm text-muted-foreground">Enter project details below</p>
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
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors?.name ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter project name"
              />
              {errors?.name && (
                <p className="text-red-500 text-xs mt-1">{errors?.name}</p>
              )}
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData?.description}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${
                  errors?.description ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Describe your carbon offset project"
              />
              {errors?.description && (
                <p className="text-red-500 text-xs mt-1">{errors?.description}</p>
              )}
            </div>

            {/* Project Type and Methodology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Type *
                </label>
                <select
                  name="type"
                  value={formData?.type}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors?.type ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value="">Select project type</option>
                  {projectTypes?.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                {errors?.type && (
                  <p className="text-red-500 text-xs mt-1">{errors?.type}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Methodology *
                </label>
                <select
                  name="methodology"
                  value={formData?.methodology}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors?.methodology ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value="">Select methodology</option>
                  {methodologies?.map((methodology, index) => (
                    <option key={index} value={methodology}>{methodology}</option>
                  ))}
                </select>
                {errors?.methodology && (
                  <p className="text-red-500 text-xs mt-1">{errors?.methodology}</p>
                )}
              </div>
            </div>

            {/* Location and Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData?.location}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors?.location ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="e.g., Kokan, Goa"
                />
                {errors?.location && (
                  <p className="text-red-500 text-xs mt-1">{errors?.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Size (hectares) *
                </label>
                <input
                  type="number"
                  name="size"
                  value={formData?.size}
                  onChange={handleInputChange}
                  min="0"
                  step="0.1"
                  className={`w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors?.size ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="0.0"
                />
                {errors?.size && (
                  <p className="text-red-500 text-xs mt-1">{errors?.size}</p>
                )}
              </div>
            </div>

            {/* Expected Credits and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Expected Credits *
                </label>
                <input
                  type="number"
                  name="expectedCredits"
                  value={formData?.expectedCredits}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors?.expectedCredits ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="0"
                />
                {errors?.expectedCredits && (
                  <p className="text-red-500 text-xs mt-1">{errors?.expectedCredits}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData?.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors?.startDate ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors?.startDate && (
                  <p className="text-red-500 text-xs mt-1">{errors?.startDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData?.endDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors?.endDate ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors?.endDate && (
                  <p className="text-red-500 text-xs mt-1">{errors?.endDate}</p>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Notes
              </label>
              <textarea
                name="additionalNotes"
                value={formData?.additionalNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Any additional information about the project"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting && <Icon name="Loader2" size={16} className="animate-spin" />}
              <span>{isSubmitting ? 'Creating...' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;