import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";

// Components & Layouts
import AppLayout from "./main/layout/AppLayout";
import AdminLayout from "./main/layout/AdminLayout";
import AdminProtected from "./components/ProtectedRoute"; 
import ProtectedRoute from "./main/auth/ProtectedRoute"; 

// Public Pages
import LandingPage from './pages/landingPage';
import SignIn from './main/auth/SignIn';
import SignUp from './main/auth/SignUp';
import ForgotPassword from "./main/auth/ForgotPassword";
import ResetPassword from "./main/auth/ResetPassword";
import AdminLogin from "./main/pages/admin/AdminLogin";

// App Pages
import BrowseEvents from "./main/pages/BrowseEvents";
import DetailHub from "./main/pages/EventDetail"; 
import DonationDetailHub from "./main/pages/DonationDetailHub";
import AvailableTicketsPage from "./main/pages/AvailableTickets";
import ScanTicketPage from "./main/pages/ScanTicket";
import TicketCodePage from "./main/pages/TicketCode";
import Settings from "./main/pages/new/Settings";
import ProfilePage from "./main/pages/ProfilePage";
import SupportPage from "./pages/SupportPage";
import FeedbackPage from "./main/pages/FeedbackPage";
import Notifications from './main/pages/Notifications';
import DashboardPage from './main/pages/DashboardPage';

// Admin Pages
import AdminOverviewPage from "./main/pages/admin/OverviewPage";
import AdminUsersPage from "./main/pages/admin/UsersPage";
import AdminContentPage from "./main/pages/admin/ContentPage";
import AdminFinancialsPage from "./main/pages/admin/FinancialsPage";
import SupportFeedback from "./main/pages/admin/Support&Feedback";

// Compliance
import PulseEventPolicy from './pages/compliance/privacyPolicy';
import TermsOfExecution from './pages/compliance/TermsofExecution';
import FraudPrevention from './pages/compliance/FraudPrevention';
import NotFound from './404/NotFound';
import { AuthProvider, useAuth } from './main/auth/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';

// New
import Create from './main/pages/New/Create';
import Explore from './main/pages/New/Explore';
import Scan from './main/pages/New/Scan';
import MyBookings from './main/pages/view/MyBookings';
import MyDonations from './main/pages/view/MyDonations';
import MyEvents from './main/pages/view/MyEvents';

// Scroll Restoration Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useAuth();

  return (
    <div>
      <ScrollToTop />
      
      <AuthProvider>
        <Routes>
          {/* Isolated Public Corridor */}
          <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forgotpwd" element={<ForgotPassword />} />
          <Route path="/resetpwd" element={<ResetPassword />} />
          <Route path="/privacy" element={<PulseEventPolicy />} /> 
          <Route path="/terms" element={<TermsOfExecution />} /> 
          <Route path="/security" element={<FraudPrevention />} />
          
          {/* ========================================================= */}
          {/* UPDATED: Protected Core App Layout Cluster */}
          {/* ========================================================= */}
          <Route element={
            <ThemeProvider userId={user?.id}>
              <ProtectedRoute />
            </ThemeProvider>
          }>
            <Route element={<AppLayout setIsLoggedIn={setIsLoggedIn} />}>
              <Route path="/dashboard" element={<DashboardPage /> } />
              {/* <Route path="/create" element={<EventCreationForm /> } /> */}
              <Route path="/browse" element={<BrowseEvents />} />
              <Route path="/available-tickets" element={<AvailableTicketsPage />} />
              <Route path="/scan-ticket" element={<ScanTicketPage />} />
              <Route path="/ticket-code" element={<TicketCodePage />} />
              <Route path="/settings" element={<Settings />} />
              {/* <Route path="/available-donations" element={<AvailableDonationsPage />} /> */}
              <Route path="/support" element={<SupportPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/explore/events/:routeId" element={<DetailHub routeType="events" />} />
              <Route path="/explore/donations/:routeId" element={<DonationDetailHub />} />

              {/* New */}
              <Route path="/create" element={<Create />} />
              <Route path="/search" element={<Explore />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/mybookings" element={<MyBookings />} />
              <Route path="/mydonations" element={<MyDonations />} />
              <Route path="/myevents" element={<MyEvents />} />
              <Route path="/eved" element={<DetailHub />} />
            </Route>
          </Route>

          {/* Admin Portal Cluster */}
          {/* 1. Public Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 2. Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <AdminProtected>
                <AdminLayout />
              </AdminProtected>
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
      </AuthProvider>
    </div>
  );
};

export default App;