import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

// Components & Layouts
import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure this file exists

// Public Pages
import LandingPage from './page/landingPage';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import ForgotPassword from "./page/ForgotPassword";
import AdminLogin from "./page/admin/AdminLogin"; // Ensure this file exists

// App Pages
import BrowseEvents from "./page/BrowseEvents";
import DetailHub from "./page/EventDetail"; 
import DonationDetailHub from "./page/DonationDetailHub"; 
import CreateOpportunity from "./page/CreateOpportunity";
import CreateDonation from "./page/CreateDonation";
import AvailableTicketsPage from "./page/AvailableTickets";
import ScanTicketPage from "./page/ScanTicket";
import TicketCodePage from "./page/TicketCode";
import SettingsPage from "./page/Settings";
import AvailableDonationsPage from "./page/AvailableDonationPage";
import ProfilePage from "./page/ProfilePage";
import SupportPage from "./page/SupportPage";
import FeedbackPage from "./page/FeedbackPage";
import Notifications from './page/Notifications';

// Admin Pages
import AdminOverviewPage from "./page/admin/OverviewPage";
import AdminUsersPage from "./page/admin/UsersPage";
import AdminContentPage from "./page/admin/ContentPage";
import AdminFinancialsPage from "./page/admin/FinancialsPage";
import SupportFeedback from "./page/admin/Support&Feedback";

// Compliance
import PulseEventPolicy from './page/compliance/privacyPolicy';
import TermsOfExecution from './page/compliance/TermsofExecution';
import FraudPrevention from './page/compliance/FraudPrevention';
import NotFound from './page/NotFound';

// Scroll Restoration Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div>
      <ScrollToTop />
      
      <Routes>
        {/* Isolated Public Corridor */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/privacy" element={<PulseEventPolicy />} /> 
        <Route path="/terms" element={<TermsOfExecution />} /> 
        <Route path="/security" element={<FraudPrevention />} /> 
        
        {/* Protected Core App Layout Cluster */}
        <Route element={<AppLayout />}>
          <Route path="/browse" element={<BrowseEvents />} />
          <Route path="/create-event-ticket" element={<CreateOpportunity />} />
          <Route path="/create-campaign" element={<CreateDonation />} />
          <Route path="/available-tickets" element={<AvailableTicketsPage />} />
          <Route path="/scan-ticket" element={<ScanTicketPage />} />
          <Route path="/ticket-code" element={<TicketCodePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/available-donations" element={<AvailableDonationsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/explore/events/:routeId" element={<DetailHub routeType="events" />} />
          <Route path="/explore/donations/:routeId" element={<DonationDetailHub />} />
        </Route>

        {/* Admin Portal Cluster */}
        {/* 1. Public Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 2. Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverviewPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="content" element={<AdminContentPage />} />
          <Route path="financials" element={<AdminFinancialsPage />} />
          <Route path="support" element={<SupportFeedback />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;