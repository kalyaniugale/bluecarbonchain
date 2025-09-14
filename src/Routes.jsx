import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import SessionManager from "./components/ui/SessionManager";
import NotFound from "pages/NotFound";
import TokenFlowVisualization from './pages/token-flow-visualization';
import NCCRAdminDashboard from './pages/nccr-admin-dashboard';
import Login from './pages/login';
import InvestorDashboard from './pages/investor-dashboard';
import NGODashboard from './pages/ngo-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <SessionManager>
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<InvestorDashboard />} />
            <Route path="/token-flow-visualization" element={<TokenFlowVisualization />} />
            <Route path="/nccr-admin-dashboard" element={<NCCRAdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/investor-dashboard" element={<InvestorDashboard />} />
            <Route path="/ngo-dashboard" element={<NGODashboard />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </SessionManager>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;