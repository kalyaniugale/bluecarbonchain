import React, { useState, useEffect } from 'react';
import { useSession } from '../../components/ui/SessionManager';
import AuthenticatedNavBar from '../../components/ui/AuthenticatedNavBar';
import RoleBasedBreadcrumb from '../../components/ui/RoleBasedBreadcrumb';
import FTDCTokenCard from './components/FTDCTokenCard';
import ProjectOverviewCard from './components/ProjectOverviewCard';
import RecentActivityCard from './components/RecentActivityCard';
import QuickActionsCard from './components/QuickActionsCard';
import ExistingProjectsList from './components/ExistingProjectsList';
import CreateProjectModal from './components/CreateProjectModal';
import ProjectDetailsModal from './components/ProjectDetailsModal';

const NGODashboard = () => {
  const { user, logout } = useSession();
  const [tokenData, setTokenData] = useState({
    balance: 2847,
    value: 1250,
    pending: 156,
    verified: 423,
    lastUpload: "Sep 12, 2025"
  });

  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Mangrove Restoration Project Alpha',
      description: 'Large-scale mangrove restoration initiative focused on coastal protection and carbon sequestration in tropical waters.',
      type: 'Mangrove Restoration',
      location: 'Coastal Florida, USA',
      size: 25.5,
      expectedCredits: 1250,
      status: 'active',
      methodology: 'Verified Carbon Standard (VCS)',
      startDate: '2025-01-15',
      endDate: '2027-01-15',
      createdAt: '2025-01-10T00:00:00Z',
      lastUpdated: '2025-01-12T00:00:00Z',
      additionalNotes: 'This project focuses on restoring degraded mangrove ecosystems while engaging local communities.'
    },
    {
      id: '2',
      name: 'Seagrass Conservation Initiative',
      description: 'Comprehensive seagrass bed protection and restoration program with community engagement components.',
      type: 'Seagrass Conservation',
      location: 'Caribbean Coast',
      size: 12.3,
      expectedCredits: 800,
      status: 'pending',
      methodology: 'Gold Standard',
      startDate: '2025-03-01',
      endDate: '2026-12-31',
      createdAt: '2025-01-05T00:00:00Z',
      lastUpdated: '2025-01-08T00:00:00Z',
      additionalNotes: 'Pending verification from local environmental authorities.'
    },
    {
      id: '3',
      name: 'Blue Carbon Kelp Forest',
      description: 'Marine kelp forest restoration and protection project targeting underwater carbon storage.',
      type: 'Kelp Forest Conservation',
      location: 'Pacific Northwest',
      size: 8.7,
      expectedCredits: 650,
      status: 'completed',
      methodology: 'Climate Action Reserve',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      createdAt: '2024-05-15T00:00:00Z',
      lastUpdated: '2025-01-01T00:00:00Z',
      additionalNotes: 'Successfully completed with 120% of expected carbon credit generation.'
    }
  ]);

  const [projectStats, setProjectStats] = useState({
    active: 0,
    pending: 0,
    completed: 0,
    carbonCredits: 1567,
    quarterlyGrowth: 23
  });

  const [recentActivities] = useState([
    {
      type: 'upload',
      title: 'Field data uploaded successfully',
      description: 'Mangrove restoration site #3 - 45 data points recorded',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'completed'
    },
    {
      type: 'verification',
      title: 'Project verification completed',
      description: 'Coastal wetland project approved by NCCR admin',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      type: 'token',
      title: 'FTDC tokens received',
      description: '156 tokens credited for verified field data',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      type: 'project',
      title: 'New project initiated',
      description: 'Blue carbon seagrass restoration project started',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      type: 'verification',
      title: 'Data under review',
      description: 'Salt marsh monitoring data submitted for verification',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'pending'
    }
  ]);

  // Modal states
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Update project stats when projects change
  useEffect(() => {
    const active = projects?.filter(p => p?.status === 'active')?.length || 0;
    const pending = projects?.filter(p => p?.status === 'pending')?.length || 0;
    const completed = projects?.filter(p => p?.status === 'completed')?.length || 0;
    
    setProjectStats(prev => ({
      ...prev,
      active,
      pending,
      completed
    }));
  }, [projects]);

  const handleDataUpload = () => {
    // Simulate successful data upload
    setTokenData(prev => ({
      ...prev,
      pending: prev?.pending + 25,
      lastUpload: new Date()?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }));
  };

  const handleCreateProject = () => {
    setIsCreateProjectModalOpen(true);
  };

  const handleProjectSubmit = (projectData) => {
    setProjects(prev => [projectData, ...prev]);
    setIsCreateProjectModalOpen(false);
    
    // Add success activity
    const newActivity = {
      type: 'project',
      title: 'New project created',
      description: `${projectData?.name} project has been successfully created`,
      timestamp: new Date(),
      status: 'completed'
    };
    
    // This would typically update the activities list
    console.log('New project created:', projectData);
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsProjectDetailsModalOpen(true);
  };

  useEffect(() => {
    document.title = 'NGO Dashboard - BlueCarbonChain';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavBar user={user} onLogout={logout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RoleBasedBreadcrumb user={user} />
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">NGO Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Manage your carbon offset projects and track FTDC tokens.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>System Status: Online</span>
              </div>
              <span>•</span>
              <span>Last sync: {new Date()?.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Cards */}
            <div className="lg:col-span-2 space-y-6">
              <FTDCTokenCard 
                tokenData={tokenData} 
                onDataUpload={handleDataUpload}
              />
              <ProjectOverviewCard projectStats={projectStats} />
              <ExistingProjectsList 
                projects={projects} 
                onViewProject={handleViewProject}
              />
            </div>

            {/* Right Column - Secondary Cards */}
            <div className="space-y-6">
              <QuickActionsCard onCreateProject={handleCreateProject} />
              <RecentActivityCard activities={recentActivities} />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-primary mb-1">
                  {(tokenData?.balance * tokenData?.value * 83)?.toLocaleString('en-IN', { 
                    style: 'currency', 
                    currency: 'INR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </div>

                <div className="text-sm text-muted-foreground">Total Token Value</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-success mb-1">
                  {projectStats?.carbonCredits?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Carbon Credits Earned</div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-2xl font-bold text-accent mb-1">
                  {projects?.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Projects</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onSubmit={handleProjectSubmit}
      />

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isProjectDetailsModalOpen}
        onClose={() => {
          setIsProjectDetailsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
};

export default NGODashboard;