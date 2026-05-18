
import { Routes, Route,  } from "react-router-dom";
import LandingPage from './page/landingPage';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import ForgotPassword from "./page/ForgotPassword";
import BrowseEvents from "./page/BrowseEvents";
import EventDetail from "./page/EventDetail";
import DetailHub from "./page/EventDetail";

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/signin" element={ <SignIn /> } />
        <Route path="/signup" element={ <SignUp/> } />
        <Route path="/forgot" element={ <ForgotPassword/> } />
        <Route path="/browse" element={ <BrowseEvents/> } />
        <Route path="/explore/:routeType/:routeId" element={<DetailHub/>} />
      </Routes>
      
    </div>
  )
}

export default App