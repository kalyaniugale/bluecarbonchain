import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../components/ui/SessionManager';
import AuthenticatedNavBar from '../../components/ui/AuthenticatedNavBar';
import RoleBasedBreadcrumb from '../../components/ui/RoleBasedBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectOverviewTable from './components/ProjectOverviewTable';
import TokenManagementSection from './components/TokenManagementSection';
import AdminSummaryCards from './components/AdminSummaryCards';
import BulkActionsPanel from './components/BulkActionsPanel';
import SystemMetricsChart from './components/SystemMetricsChart';

const NCCRAdminDashboard = () => {
  const { user, logout, isAuthenticated } = useSession();
  const navigate = useNavigate();
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastSimulation, setLastSimulation] = useState(null);

  // -------- INDIAN CONTEXT: projects (NGOs + locations in India) --------
  const [projects] = useState([
    {
      id: 'proj_001',
      ngoName: 'Sundarbans Eco Trust',
      location: 'South 24 Parganas, West Bengal',
      projectType: 'Mangrove Restoration',
      area: 150,
      submissionDate: '2024-09-10',
      verificationStatus: 'under_review'
    },
    {
      id: 'proj_002',
      ngoName: 'Sagar Mitra Foundation',
      location: 'Kollam, Kerala',
      projectType: 'Seagrass Conservation',
      area: 85,
      submissionDate: '2024-09-08',
      verificationStatus: 'pending'
    },
    {
      id: 'proj_003',
      ngoName: 'Gulf of Kachchh Coastal Initiative',
      location: 'Jamnagar, Gujarat',
      projectType: 'Salt Marsh Restoration',
      area: 200,
      submissionDate: '2024-09-05',
      verificationStatus: 'approved'
    },
    {
      id: 'proj_004',
      ngoName: 'Pichavaram Green Collective',
      location: 'Cuddalore, Tamil Nadu',
      projectType: 'Mangrove Revival Project',
      area: 120,
      submissionDate: '2024-09-12',
      verificationStatus: 'under_review'
    },
    {
      id: 'proj_005',
      ngoName: 'Chilika Wetland Trust',
      location: 'Puri–Khordha, Odisha',
      projectType: 'Seagrass Restoration',
      area: 75,
      submissionDate: '2024-09-03',
      verificationStatus: 'rejected'
    }
  ]);

  // -------- INDIAN CONTEXT: tokens (values in INR scale) --------
  const [tokens] = useState([
    {
      id: 'ftdc_001',
      tokenId: 'FTDC-2024-001',
      projectName: 'Mangrove Restoration',
      ngoName: 'Sundarbans Eco Trust',
      value: 2500000, // ₹25,00,000
      carbonCredits: 150,
      status: 'pending',
      createdDate: '2024-09-10'
    },
    {
      id: 'ftdc_002',
      tokenId: 'FTDC-2024-002',
      projectName: 'Seagrass Conservation',
      ngoName: 'Sagar Mitra Foundation',
      value: 1850000, // ₹18,50,000
      carbonCredits: 85,
      status: 'verified',
      createdDate: '2024-09-08'
    },
    {
      id: 'ftdc_003',
      tokenId: 'FTDC-2024-003',
      projectName: 'Salt Marsh Restoration',
      ngoName: 'Gulf of Kachchh Coastal Initiative',
      value: 3500000, // ₹35,00,000
      carbonCredits: 200,
      status: 'converted',
      createdDate: '2024-09-05'
    },
    {
      id: 'ftdc_004',
      tokenId: 'FTDC-2024-004',
      projectName: 'Mangrove Revival Project',
      ngoName: 'Pichavaram Green Collective',
      value: 2200000, // ₹22,00,000
      carbonCredits: 120,
      status: 'pending',
      createdDate: '2024-09-12'
    }
  ]);

  // -------- INDIAN CONTEXT: stats (value treated as INR) --------
  const [stats] = useState({
    projectsUnderReview: 15,
    approvedCarbonCredits: 2850,  // tons CO₂e
    pendingVerifications: 8,
    totalSystemValue: 125000000 // ₹12,50,00,000 (example)
  });

  // auth / role
  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (user?.role !== 'admin') { navigate('/login'); return; }
  }, [isAuthenticated, user, navigate]);

  const handleProjectApproval = async (projectId) => {
    setIsSimulating(true);
    try {
      await new Promise(r => setTimeout(r, 2000));
      setLastSimulation({
        type: 'project_approval',
        projectId,
        timestamp: new Date(),
        message: `Project ${projectId} has been approved successfully`
      });
    } catch (e) { console.error('Project approval failed:', e); }
    finally { setIsSimulating(false); }
  };

  const handleProjectReview = (projectId) => {
    console.log(`Reviewing project ${projectId}`);
  };

  const handleTokenVerification = async (tokenId) => {
    setIsSimulating(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      setLastSimulation({
        type: 'token_verification',
        tokenId,
        timestamp: new Date(),
        message: `Token ${tokenId} has been verified successfully`
      });
    } catch (e) { console.error('Token verification failed:', e); }
    finally { setIsSimulating(false); }
  };

  const handleTokenConversion = async (tokenId) => {
    setIsSimulating(true);
    try {
      await new Promise(r => setTimeout(r, 2000));
      setLastSimulation({
        type: 'token_conversion',
        tokenId,
        timestamp: new Date(),
        message: `Token ${tokenId} has been converted to CCT successfully`
      });
    } catch (e) { console.error('Token conversion failed:', e); }
    finally { setIsSimulating(false); }
  };

  const handleBulkApproval = async (projectIds) => {
    setIsSimulating(true);
    try {
      await new Promise(r => setTimeout(r, 3000));
      setLastSimulation({
        type: 'bulk_approval',
        count: projectIds?.length,
        timestamp: new Date(),
        message: `${projectIds?.length} projects have been approved successfully`
      });
      setSelectedProjects([]);
    } catch (e) { console.error('Bulk approval failed:', e); }
    finally { setIsSimulating(false); }
  };

  const handleBulkRejection = async (projectIds) => {
    setIsSimulating(true);
    try {
      await new Promise(r => setTimeout(r, 2500));
      setLastSimulation({
        type: 'bulk_rejection',
        count: projectIds?.length,
        timestamp: new Date(),
        message: `${projectIds?.length} projects have been rejected`
      });
      setSelectedProjects([]);
    } catch (e) { console.error('Bulk rejection failed:', e); }
    finally { setIsSimulating(false); }
  };

  const handleDataApprovalSimulation = async () => {
    setIsSimulating(true);
    try {
      await new Promise(r => setTimeout(r, 3000));
      setLastSimulation({
        type: 'data_approval_simulation',
        timestamp: new Date(),
        message:
          'Project data approval simulation completed successfully. 3 projects approved, 2 tokens verified, 1 CCT conversion initiated.'
      });
    } catch (e) { console.error('Data approval simulation failed:', e); }
    finally { setIsSimulating(false); }
  };

  const navigateToTokenFlow = () => navigate('/token-flow-visualization');

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Lock" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Access Restricted</h2>
          <p className="text-muted-foreground">Admin access required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavBar user={user} onLogout={logout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RoleBasedBreadcrumb user={user} />

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">NCCR Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage carbon credit project verification and token approval processes
              </p>
            </div>
            {/* <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={navigateToTokenFlow} iconName="GitBranch" iconPosition="left">
                Token Flow
              </Button>
              <Button variant="default" onClick={handleDataApprovalSimulation} loading={isSimulating} iconName="CheckCircle" iconPosition="left">
                Simulate Data Approval
              </Button>
            </div> */}
          </div>

          {/* Simulation Status */}
          {lastSimulation && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-success">Simulation Completed</p>
                  <p className="text-sm text-success/80 mt-1">{lastSimulation?.message}</p>
                  <p className="text-xs text-success/60 mt-1">
                    {lastSimulation?.timestamp?.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Summary Cards */}
          <AdminSummaryCards stats={stats} />

          {/* Main grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-2">
              <ProjectOverviewTable
                projects={projects}
                onApproveProject={handleProjectApproval}
                onReviewProject={handleProjectReview}
              />
            </div>
            <div className="xl:col-span-1">
              <SystemMetricsChart chartType="pie" chartData={stats} />
            </div>
          </div>

          {/* Tokens */}
          <div className="mb-8">
            <TokenManagementSection
              tokens={tokens}
              onConvertToken={handleTokenConversion}
              onVerifyToken={handleTokenVerification}
            />
          </div>

          {/* Processing overlay */}
          {isSimulating && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-card border border-border rounded-lg p-6 max-w-sm mx-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Processing...</p>
                    <p className="text-xs text-muted-foreground">Please wait while we simulate the approval process</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bulk actions */}
      <BulkActionsPanel
        selectedItems={selectedProjects}
        onBulkApprove={handleBulkApproval}
        onBulkReject={handleBulkRejection}
        onClearSelection={() => setSelectedProjects([])}
      />
    </div>
  );
};

export default NCCRAdminDashboard;
