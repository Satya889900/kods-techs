import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import logo from "../assets/himg.jpg";
import { FaHome, FaUserMd, FaTasks, FaQuestionCircle, FaPlus, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
  <img src={logo} alt="Hospital Logo" className="logo-img" />
  <span>Hospital</span>
</div>


      {/* Hamburger button (mobile) */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <Link to="/home" onClick={() => setIsOpen(false)}>
          <FaHome /> Home
        </Link>

        {user.role !== "patient" && (
          <Link to="/doctor" onClick={() => setIsOpen(false)}>
            <FaUserMd /> Doctors
          </Link>
        )}

        <Link to="/activity" onClick={() => setIsOpen(false)}>
          <FaTasks /> Activity
        </Link>

        <Link to="/help" onClick={() => setIsOpen(false)}>
          <FaQuestionCircle /> Help
        </Link>

        {(user.role === "admin" || user.role === "doctor") && (
          <Link to="/add-doctor" onClick={() => setIsOpen(false)}>
            <FaPlus /> Add Doctor
          </Link>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </nav>
  );
}
