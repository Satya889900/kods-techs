// src/pages/Signup.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupPatient, login } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name || !email || !password) return alert("Fill all fields");
    const id = Date.now();
    const newPatient = { id, name, email, password };
    dispatch(signupPatient(newPatient));
    dispatch(login({ role: "patient", ...newPatient })); // Auto login
    navigate("/patient/home"); // Redirect to Patient Home
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patient Signup</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
