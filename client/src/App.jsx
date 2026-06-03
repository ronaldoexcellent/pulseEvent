import { Routes, Route } from "react-router-dom";
import LandingPage from './page/landingPage';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import ForgotPassword from "./page/ForgotPassword";
import BrowseEvents from "./page/BrowseEvents";
import DetailHub from "./page/EventDetail"; 
import DonationDetailHub from "./page/DonationDetailHub"; 
import CreateOpportunity from "./page/CreateOpportunity";
import CreateDonation from "./page/CreateDonation";

import AppLayout from "./layout/AppLayout";
import AvailableTicketsPage from "./page/AvailableTickets";
import ScanTicketPage from "./page/ScanTicket";
import TicketCodePage from "./page/TicketCode";
import SettingsPage from "./page/Settings";
import AvailableDonationsPage from "./page/AvailableDonationPage";
import ProfilePage from "./page/ProfilePage";
import SupportPage from "./page/SupportPage";
import FeedbackPage from "./page/FeedbackPage";

// Admin Imports
import AdminLayout from "./layout/AdminLayout";
import AdminOverviewPage from "./page/admin/OverviewPage";
import AdminUsersPage from "./page/admin/UsersPage";
import AdminContentPage from "./page/admin/ContentPage";
import AdminFinancialsPage from "./page/admin/FinancialsPage";
import AdminSupportPage from "./page/admin/SupportPage";
// import AdminUsersPage from "./page/admin/UsersPage";
// import AdminContentPage from "./page/admin/ContentPage";
// import AdminFinancialsPage from "./page/admin/FinancialsPage";
// import AdminSettingsPage from "./page/admin/SettingsPage";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Isolated Public Corridor */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        
        {/* Protected Core App Layout Cluster */}
        <Route element={<AppLayout />}>
          <Route path="/browse" element={<BrowseEvents />} />
          <Route path="/create-event-ticket" element={<CreateOpportunity />} />
          <Route path="/create-campaign" element={<CreateDonation />} />
          <Route path="/available-tickets" element={<AvailableTicketsPage/> } />
          <Route path="/scan-ticket" element={<ScanTicketPage/> } />
          <Route path="/ticket-code" element={<TicketCodePage/> } />
          <Route path="/settings" element={<SettingsPage/> } />
          <Route path="/available-donations" element={<AvailableDonationsPage/> } />
          <Route path="/support" element={<SupportPage/> } />
          <Route path="/feedback" element={<FeedbackPage/> } />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/explore/events/:routeId" element={<DetailHub routeType="events" />} />
          <Route path="/explore/donations/:routeId" element={<DonationDetailHub />} />
        </Route>

        {/* Admin Portal Cluster */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Default view when navigating to /admin */}
          <Route index element={<AdminOverviewPage />} />
          <Route path="users" element={ <AdminUsersPage /> } />
          <Route path="content" element={ <AdminContentPage /> } />
          <Route path="financials" element={<AdminFinancialsPage />} />
          <Route path="support-admin" element={<AdminSupportPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;