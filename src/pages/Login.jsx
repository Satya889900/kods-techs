import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import './Home.jsx';
import './LoginForm.css';

export default function LoginPage() {
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    location: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ role, ...formData }));

    // Redirect based on role
    if (role === "admin") navigate("/home");
    else if (role === "doctor") navigate("/doctor");
    else navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Hospital Portal</h2>
        <p>Select your role to login</p>

        {/* Role Selection */}
        <div className="role-selection">
          <div 
            className={`role-card ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
          >
            <i className="fas fa-user-shield"></i>
            <span>Admin</span>
          </div>
          <div 
            className={`role-card ${role === "doctor" ? "active" : ""}`}
            onClick={() => setRole("doctor")}
          >
            <i className="fas fa-user-md"></i>
            <span>Doctor</span>
          </div>
          <div 
            className={`role-card ${role === "patient" ? "active" : ""}`}
            onClick={() => setRole("patient")}
          >
            <i className="fas fa-user-injured"></i>
            <span>Patient</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {role === "patient" && (
            <>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            </>
          )}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
