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
import UploadFieldDataModal from './components/UploadFieldDataModal';
import FundingTransactionsCard from './components/FundingTransactionsCard';

const typeLabelMap = {
  photo: 'Site Photo',
  geoPhoto: 'Geo-tagged Photo',
  drone: 'Drone Image',
  sensor: 'Sensor Log',
  survey: 'Field Survey',
};

const NGODashboard = () => {
  const { user, logout } = useSession();

  // FDCT balances
  const [tokenData, setTokenData] = useState({
    balance: 2847,
    value: 1200,
    pending: 156,
    verified: 423,
    lastUpload: 'Sep 12, 2025'
  });

  // Example projects
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Sundarbans Mangrove Revival',
      description: 'Restoration of degraded mangroves with village SHGs.',
      type: 'Mangrove Restoration',
      location: 'South 24 Parganas, West Bengal',
      size: 32.5,
      expectedCredits: 1400,
      status: 'active'
    },
    {
      id: '2',
      name: 'Gulf of Mannar Seagrass Restoration',
      description: 'Replanting seagrass meadows with fishing coop members.',
      type: 'Seagrass Conservation',
      location: 'Tamil Nadu Coast',
      size: 14.2,
      expectedCredits: 900,
      status: 'pending'
    }
  ]);

  // stats
  const [projectStats, setProjectStats] = useState({
    active: 0,
    pending: 0,
    completed: 0,
    carbonCredits: 1567
  });

  // activity + transactions
  const [recentActivities, setRecentActivities] = useState([]);
  const [transactions, setTransactions] = useState([
    {
      id: 'T-001',
      date: '2025-09-25',
      projectId: '1',
      projectName: 'Sundarbans Mangrove Revival',
      investor: 'Prakriti Ventures LLP (Mumbai)',
      tokens: 500,
      pricePerTokenINR: 950,
      totalINR: 500 * 950,
      stage: 'Released',
      status: 'Completed'
    },
    {
      id: 'T-002',
      date: '2025-09-20',
      projectId: '2',
      projectName: 'Gulf of Mannar Seagrass Restoration',
      investor: 'GreenEdge Capital (Bangalore)',
      tokens: 300,
      pricePerTokenINR: 1020,
      totalINR: 300 * 1020,
      stage: 'Escrow',
      status: 'In Progress'
    }
  ]);

  // modal states
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // recalc stats
  useEffect(() => {
    const active = projects.filter(p => p.status === 'active').length;
    const pending = projects.filter(p => p.status === 'pending').length;
    const completed = projects.filter(p => p.status === 'completed').length;
    setProjectStats({ active, pending, completed, carbonCredits: 1567 });
  }, [projects]);

  // handlers
  const handleProjectSubmit = (projectData) => {
    setProjects(prev => [projectData, ...prev]);
    setIsCreateProjectModalOpen(false);
  };

  const handleOpenUpload = (project) => {
    setSelectedProject(project);
    setIsUploadModalOpen(true);
  };

  const handleSubmitUpload = (payload) => {
    console.log("UPLOAD PAYLOAD >>>", payload);

    if (!payload || !payload.projectId) {
      alert("Upload failed: no project ID.");
      return;
    }

    const { projectId, type, recordsCount, meta } = payload;
    const recs = Number.isFinite(Number(recordsCount)) ? Number(recordsCount) : 0;
    const proj = projects.find(p => p.id === projectId);

    if (!proj) {
      alert("Upload failed: project not found.");
      return;
    }

    // update FDCT
    const addPending = Math.max(5, Math.floor(recs / 2));
    setTokenData(prev => ({
      ...prev,
      pending: (prev?.pending || 0) + addPending,
      lastUpload: new Date().toLocaleDateString('en-GB')
    }));

    // activity (with geo if available)
    const locText = meta?.lat && meta?.lng ? ` · (${meta.lat}, ${meta.lng})` : '';
    setRecentActivities(prev => [
      {
        type: 'upload',
        title: `${typeLabelMap[type] || 'Data'} uploaded`,
        description: `${proj.name} · ${recs} record(s)${locText}`,
        timestamp: new Date(),
        status: 'completed'
      },
      ...prev
    ]);

    // fake transaction with Indian investor
    const demoInvestors = [
      "Prakriti Ventures LLP (Mumbai)",
      "GreenEdge Capital (Bangalore)",
      "Sagar Sustainables Pvt Ltd (Chennai)",
      "Himalaya Carbon Trust (Delhi)"
    ];
    const investor = demoInvestors[Math.floor(Math.random() * demoInvestors.length)];
    const tokens = Math.max(50, Math.floor(recs / 3));
    const pricePerTokenINR = 975;

    setTransactions(prev => [
      {
        id: `T-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        projectId,
        projectName: proj.name,
        investor,
        tokens,
        pricePerTokenINR,
        totalINR: tokens * pricePerTokenINR,
        stage: 'Escrow',
        status: 'In Progress'
      },
      ...prev
    ]);

    // close modal
    setIsUploadModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavBar user={user} onLogout={logout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RoleBasedBreadcrumb user={user} />

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <FTDCTokenCard tokenData={tokenData} />
              <ProjectOverviewCard projectStats={projectStats} />
              <ExistingProjectsList
                projects={projects}
                onViewProject={setSelectedProject}
                onUploadData={handleOpenUpload}
              />
            </div>
            <div className="space-y-6">
              <QuickActionsCard
                onCreateProject={() => setIsCreateProjectModalOpen(true)}
                onUploadData={() => {
                  const first = projects.find(p => p.status !== 'completed') || projects[0];
                  if (first) handleOpenUpload(first);
                }}
              />
              <FundingTransactionsCard transactions={transactions} />
              <RecentActivityCard activities={recentActivities} />
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
        onClose={() => setIsProjectDetailsModalOpen(false)}
      />
      <UploadFieldDataModal
        isOpen={isUploadModalOpen}
        project={selectedProject}
        onClose={() => { setIsUploadModalOpen(false); setSelectedProject(null); }}
        onSubmit={handleSubmitUpload}
      />
    </div>
  );
};

export default NGODashboard;
