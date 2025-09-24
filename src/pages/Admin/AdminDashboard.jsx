import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDoctor } from "../../redux/slice/doctorSlice";
 // optional CSS for styling

export default function AdminDashboard() {
  const doctors = useSelector((state) => state.doctors.doctors);
  const dispatch = useDispatch();

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: ""
  });

  const handleChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialization) {
      alert("Please fill all fields");
      return;
    }
    dispatch(addDoctor(newDoctor));
    setNewDoctor({ name: "", specialization: "" });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section className="add-doctor">
        <h3>Add Doctor</h3>
        <form onSubmit={handleAddDoctor}>
          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={newDoctor.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={newDoctor.specialization}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Doctor</button>
        </form>
      </section>

      <section className="doctor-list">
        <h3>Doctor List</h3>
        {doctors.length === 0 ? (
          <p>No doctors available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.id}</td>
                  <td>{doc.name}</td>
                  <td>{doc.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
