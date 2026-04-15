import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import Plans from "./components/Plans/Plans";
import Play from "./components/Play/Play";
import Upcoming from "./components/Upcoming/Upcoming";
import Shows from "./components/Shows/Shows";
import Profile from "./components/Profile/Profile";
import About from "./components/About/About";
import Discover from "./components/Discover/Discover";
import Payments from "./components/Payments/Payments";

function App() {
  return (
    <Router>
      <div className="route-page-transition">
        <Routes>
          <Route path="*" element={<Navigate to="/" replace/>} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/play/:videoId" element={<Play />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
