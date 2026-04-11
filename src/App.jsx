import Footer from "./components/Home/Footer/Footer";
import Hero from "./components/Home/Hero/Hero";
import LatestRelease from "./components/Home/LatestRelease/LatestRelease";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="route-page-transition">
      <Routes location={location}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <Hero />
              <LatestRelease />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
