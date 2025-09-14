import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../components/ui/SessionManager';
import AuthenticatedNavBar from '../../components/ui/AuthenticatedNavBar';
import RoleBasedBreadcrumb from '../../components/ui/RoleBasedBreadcrumb';
import ProjectListingsTable from './components/ProjectListingsTable';
import ProjectFilters from './components/ProjectFilters';
import PortfolioSummary from './components/PortfolioSummary';
import FTDCTokenPurchase from './components/FTDCTokenPurchase';
import PurchaseSuccessModal from './components/PurchaseSuccessModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InvestorDashboard = () => {
  const { user, logout, isAuthenticated } = useSession();
  const navigate = useNavigate();
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const [lastPurchaseData, setLastPurchaseData] = useState(null);
  const [portfolioData, setPortfolioData] = useState({
    currentHoldings: 2450,
    portfolioValue: 61250,
    availableBalance: 125000,
    totalInvested: 85000,
    holdingsChange: 12.5,
    valueChange: 8.3,
    investmentChange: 15.2,
    recentActivity: [
      {
        type: 'purchase',
        description: 'Purchased FTDC tokens for Mangrove Revival Project',
        amount: '150 FTDC',
        unit: 'tokens',
        timestamp: '2 hours ago'
      },
      {
        type: 'conversion',
        description: 'FTDC tokens converted to CCT',
        amount: '75 CCT',
        unit: 'tokens',
        timestamp: '1 day ago'
      },
      {
        type: 'purchase',
        description: 'Invested in Seagrass Conservation Initiative',
        amount: '200 FTDC',
        unit: 'tokens',
        timestamp: '3 days ago'
      }
    ]
  });

  // Mock project data
  const mockProjects = [
    {
      id: 1,
      name: 'Mangrove Revival Project',
      type: 'Mangrove Restoration',
      location: 'Costa Rica',
      carbonPotential: '15,000',
      investmentAmount: 250000,
      status: 'Active',
      details: {
        biodiversityScore: 9.2,
        communityImpact: 'High',
        areaCoverage: '500 hectares',
        verificationStatus: 'Verified',
        certifyingBody: 'Verra VCS',
        lastAudit: '09/01/2024',
        expectedReturns: {
          roi: '12-15%',
          paybackPeriod: '3-4 years',
          riskLevel: 'Low'
        },
        description: `This comprehensive mangrove restoration project focuses on rehabilitating degraded coastal ecosystems in Costa Rica. The initiative combines community engagement with scientific monitoring to ensure long-term sustainability and maximum carbon sequestration potential.`
      }
    },
    {
      id: 2,
      name: 'Seagrass Conservation Initiative',
      type: 'Seagrass Conservation',
      location: 'Philippines',
      carbonPotential: '8,500',
      investmentAmount: 180000,
      status: 'Active',
      details: {
        biodiversityScore: 8.7,
        communityImpact: 'Medium',
        areaCoverage: '300 hectares',
        verificationStatus: 'Pending',
        certifyingBody: 'Gold Standard',
        lastAudit: '08/15/2024',
        expectedReturns: {
          roi: '10-12%',
          paybackPeriod: '4-5 years',
          riskLevel: 'Medium'
        },
        description: `Protecting and restoring critical seagrass meadows that serve as nurseries for marine life while capturing significant amounts of blue carbon. This project includes local community training and sustainable fishing practices.`
      }
    },
    {
      id: 3,
      name: 'Coral Reef Restoration',
      type: 'Coral Reef Protection',
      location: 'Indonesia',
      carbonPotential: '12,000',
      investmentAmount: 320000,
      status: 'Pending',
      details: {
        biodiversityScore: 9.5,
        communityImpact: 'High',
        areaCoverage: '200 hectares',
        verificationStatus: 'In Progress',
        certifyingBody: 'Climate Action Reserve',
        lastAudit: '07/20/2024',
        expectedReturns: {
          roi: '15-18%',
          paybackPeriod: '2-3 years',
          riskLevel: 'Medium'
        },
        description: `Advanced coral restoration using innovative techniques including coral gardening and assisted evolution. This project aims to rebuild resilient reef ecosystems while providing sustainable livelihoods for local communities.`
      }
    },
    {
      id: 4,
      name: 'Coastal Wetlands Protection',
      type: 'Coastal Wetlands',
      location: 'Madagascar',
      carbonPotential: '20,000',
      investmentAmount: 450000,
      status: 'Active',
      details: {
        biodiversityScore: 9.8,
        communityImpact: 'High',
        areaCoverage: '800 hectares',
        verificationStatus: 'Verified',
        certifyingBody: 'Verra VCS',
        lastAudit: '08/30/2024',
        expectedReturns: {
          roi: '14-16%',
          paybackPeriod: '3-4 years',
          riskLevel: 'Low'
        },
        description: `Large-scale coastal wetland conservation project protecting critical habitat for endemic species while maximizing carbon storage. Includes community-based management and eco-tourism development.`
      }
    },
    {
      id: 5,
      name: 'Blue Carbon Research Station',
      type: 'Marine Protected Areas',
      location: 'Brazil',
      carbonPotential: '6,500',
      investmentAmount: 150000,
      status: 'Completed',
      details: {
        biodiversityScore: 8.9,
        communityImpact: 'Medium',
        areaCoverage: '150 hectares',
        verificationStatus: 'Verified',
        certifyingBody: 'Gold Standard',
        lastAudit: '09/10/2024',
        expectedReturns: {
          roi: '11-13%',
          paybackPeriod: '5-6 years',
          riskLevel: 'Low'
        },
        description: `Research-focused marine protected area that combines scientific study with carbon credit generation. This project provides valuable data for future blue carbon initiatives while protecting marine biodiversity.`
      }
    },
    {
      id: 6,
      name: 'Kelp Forest Restoration',
      type: 'Seagrass Conservation',
      location: 'Thailand',
      carbonPotential: '9,200',
      investmentAmount: 200000,
      status: 'Active',
      details: {
        biodiversityScore: 8.4,
        communityImpact: 'Medium',
        areaCoverage: '250 hectares',
        verificationStatus: 'Verified',
        certifyingBody: 'Climate Action Reserve',
        lastAudit: '08/05/2024',
        expectedReturns: {
          roi: '9-11%',
          paybackPeriod: '4-5 years',
          riskLevel: 'Medium'
        },
        description: `Innovative kelp forest restoration project using sustainable aquaculture techniques. This initiative combines carbon sequestration with sustainable seaweed farming for local communities.`
      }
    }
  ];

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'investor') {
      navigate('/login');
      return;
    }
    setFilteredProjects(mockProjects);
  }, [isAuthenticated, user, navigate]);

  const handleFiltersChange = (filters) => {
    let filtered = [...mockProjects];

    if (filters?.search) {
      filtered = filtered?.filter(project =>
        project?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        project?.type?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        project?.location?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.location) {
      filtered = filtered?.filter(project => project?.location === filters?.location);
    }

    if (filters?.carbonType) {
      filtered = filtered?.filter(project => project?.type === filters?.carbonType);
    }

    if (filters?.status) {
      filtered = filtered?.filter(project => project?.status === filters?.status);
    }

    if (filters?.minInvestment) {
      filtered = filtered?.filter(project => project?.investmentAmount >= parseFloat(filters?.minInvestment));
    }

    if (filters?.maxInvestment) {
      filtered = filtered?.filter(project => project?.investmentAmount <= parseFloat(filters?.maxInvestment));
    }

    setFilteredProjects(filtered);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handlePurchaseComplete = (purchaseData) => {
    setLastPurchaseData(purchaseData);
    setShowPurchaseSuccess(true);
    
    // Update portfolio data
    setPortfolioData(prev => ({
      ...prev,
      currentHoldings: prev?.currentHoldings + purchaseData?.tokens,
      portfolioValue: prev?.portfolioValue + purchaseData?.amount,
      availableBalance: prev?.availableBalance - purchaseData?.amount,
      totalInvested: prev?.totalInvested + purchaseData?.amount,
      recentActivity: [
        {
          type: 'purchase',
          description: `Purchased FTDC tokens for ${purchaseData?.project?.name}`,
          amount: `${purchaseData?.tokens} FTDC`,
          unit: 'tokens',
          timestamp: 'Just now'
        },
        ...prev?.recentActivity?.slice(0, 2)
      ]
    }));
  };

  const handleViewTokenFlow = () => {
    navigate('/token-flow-visualization');
  };

  if (!isAuthenticated || user?.role !== 'investor') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavBar user={user} onLogout={logout} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RoleBasedBreadcrumb user={user} />
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Investor Dashboard
              </h1>
              <p className="text-muted-foreground">
                Discover and invest in carbon credit projects worldwide
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleViewTokenFlow}
                iconName="GitBranch"
                iconPosition="left"
              >
                Token Flow
              </Button>
              <div className="text-sm text-muted-foreground">
                Welcome back, <span className="font-medium text-foreground">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Projects */}
            <div className="xl:col-span-2 space-y-6">
              <ProjectFilters
                onFiltersChange={handleFiltersChange}
                totalProjects={mockProjects?.length}
                filteredCount={filteredProjects?.length}
              />
              
              <ProjectListingsTable
                projects={filteredProjects}
                onProjectSelect={handleProjectSelect}
              />
            </div>

            {/* Right Column - Portfolio & Purchase */}
            <div className="space-y-6">
              <PortfolioSummary portfolioData={portfolioData} />
              
              <FTDCTokenPurchase
                onPurchaseComplete={handlePurchaseComplete}
                availableBalance={portfolioData?.availableBalance}
              />
            </div>
          </div>

          {/* Selected Project Details Modal */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
              <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        {selectedProject?.name}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Icon name="MapPin" size={14} />
                          <span>{selectedProject?.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Leaf" size={14} />
                          <span>{selectedProject?.type}</span>
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-background rounded-lg border border-border p-4">
                      <h3 className="font-medium text-foreground mb-3">Investment Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investment Amount:</span>
                          <span className="font-medium text-foreground">
                            ${selectedProject?.investmentAmount?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Carbon Potential:</span>
                          <span className="font-medium text-foreground">
                            {selectedProject?.carbonPotential} tons CO₂
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className={`font-medium ${
                            selectedProject?.status === 'Active' ? 'text-success' :
                            selectedProject?.status === 'Pending' ? 'text-warning' : 'text-primary'
                          }`}>
                            {selectedProject?.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background rounded-lg border border-border p-4">
                      <h3 className="font-medium text-foreground mb-3">Expected Returns</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ROI:</span>
                          <span className="font-medium text-success">
                            {selectedProject?.details?.expectedReturns?.roi}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payback Period:</span>
                          <span className="font-medium text-foreground">
                            {selectedProject?.details?.expectedReturns?.paybackPeriod}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Risk Level:</span>
                          <span className={`font-medium ${
                            selectedProject?.details?.expectedReturns?.riskLevel === 'Low' ? 'text-success' :
                            selectedProject?.details?.expectedReturns?.riskLevel === 'Medium' ? 'text-warning' : 'text-error'
                          }`}>
                            {selectedProject?.details?.expectedReturns?.riskLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-foreground mb-3">Project Description</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject?.details?.description}
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => setSelectedProject(null)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="default"
                      fullWidth
                      iconName="TrendingUp"
                      iconPosition="left"
                    >
                      Invest in Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Purchase Success Modal */}
          <PurchaseSuccessModal
            isOpen={showPurchaseSuccess}
            onClose={() => setShowPurchaseSuccess(false)}
            purchaseData={lastPurchaseData}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;