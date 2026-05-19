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

// Append new module pages here
// import ScanTicket from "./page/ScanTicket";
// import Settings from "./page/Settings";

import AppLayout from "./layout/AppLayout";
import AvailableTicketsPage from "./page/AvailableTickets";
import ScanTicketPage from "./page/ScanTicket";
import TicketCodePage from "./page/TicketCode";
import SettingsPage from "./page/Settings";

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
          <Route path="/explore/events/:routeId" element={<DetailHub routeType="events" />} />
          <Route path="/explore/donations/:routeId" element={<DonationDetailHub />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
