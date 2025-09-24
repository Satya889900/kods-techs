
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PatientHome from "./pages/PatientHome";
import BookAppointment from "./pages/BookAppointment";
import BookingConfirmation from "./pages/BookingConfirmation";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Home from "./pages/Home";
import Activity from "./pages/Activity";
import Help from "./pages/Help";
import AddDoctor from "./pages/AddDoctor";

function AppLayout() {
  const location = useLocation();

  // Hide Navbar on Login and Signup pages
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Common Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/help" element={<Help />} />

        {/* Patient Routes */}
        <Route path="/patient/home" element={<PatientHome />} />
        <Route path="/patient/book/:doctorId" element={<BookAppointment />} />
        <Route
          path="/patient/confirmation/:doctorId/:patientId/:date/:time"
          element={<BookingConfirmation />}
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorDashboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
