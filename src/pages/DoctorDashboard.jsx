//// src/pages/DoctorDashboard.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DoctorDashboard.css";

import {
  confirmAppointment,
  cancelAppointment,
  rescheduleAppointment,
} from "../redux/slice/appointmentSlice";

export default function DoctorDashboard() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor?.doctors || []);
  const appointments = useSelector(
    (state) => state.appointment?.appointments || []
  );
  const user = useSelector((state) => state.auth?.user);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  if (!user) return <h2>Please login first.</h2>;

  const handleSelectDoctor = (doctor) => setSelectedDoctor(doctor);

  // Use the doctor's name (or id) depending on your data model.
  const pendingAppointments = selectedDoctor
    ? appointments.filter(
        (appt) =>
          // if appointments store doctorName:
          appt.doctorName === selectedDoctor.name &&
          (appt.status === "pending" || appt.status === "reschedule_requested")
      )
    : [];

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM"];

  return (
    <div className="doctor-dashboard">
      {/* HERO */}
      <div className="hero">
        <div className="hero-text">
          <h1>Find & Search Your Favourite Doctor</h1>
          <p>Search among top specialists and book your appointment instantly.</p>
          <div className="search-bar">
            <input type="text" placeholder="Search doctors, specialities..." />
            <button>Search</button>
          </div>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
          alt="Doctor"
        />
      </div>

      {/* STATS */}
      <div className="stats">
        <div>24/7 Service</div>
        <div>100+ Doctors</div>
        <div>1M+ Patients</div>
      </div>

      {/* SPECIALISTS */}
      <h2>Our Consulting Specialists</h2>
      <div className="specialists">
        <div className="specialist-card">
          <h3>Covid-19 Test</h3>
          <p>Quick and reliable Covid-19 testing services.</p>
        </div>
        <div className="specialist-card">
          <h3>Heart & Lungs</h3>
          <p>Expert care for cardiovascular and respiratory health.</p>
        </div>
        <div className="specialist-card">
          <h3>Specialist</h3>
          <p>Find top-rated doctors in various fields.</p>
        </div>
        <div className="specialist-card">
          <h3>Mental Health</h3>
          <p>Professional support for your well-being.</p>
        </div>
      </div>

      {/* DOCTOR LIST */}
      <h2 style={{ marginTop: 40 }}>Doctor Dashboard</h2>
      {!selectedDoctor && (
        <div className="doctor-cards">
          {doctors.map((doctor) => (
            <div
              key={doctor.id || doctor.name}
              className="doctor-card"
              onClick={() => handleSelectDoctor(doctor)}
            >
              <img
                src={
                  doctor.photo
                    ? doctor.photo
                    : "https://cdn-icons-png.flaticon.com/512/147/147144.png"
                }
                alt={doctor.name}
              />
              <h3>{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <div className="tagline">
                {doctor.patients ? `Trusted by ${doctor.patients}+ patients` : "Trusted by 500+ patients"}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* APPOINTMENTS FOR SELECTED DOCTOR */}
      {selectedDoctor && (
        <div className="doctor-appointments">
          <h3>Pending Appointments for Dr. {selectedDoctor.name}</h3>

          {pendingAppointments.length === 0 ? (
            <p>No pending appointments.</p>
          ) : (
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAppointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.patientName}</td>
                    <td>{appt.date}</td>
                    <td>{appt.time}</td>
                    <td>{appt.status}</td>
                    <td>
                      {appt.status === "pending" && (
                        <>
                          <button
                            className="button confirm-btn"
                            onClick={() => dispatch(confirmAppointment(appt.id))}
                          >
                            Confirm
                          </button>
                          <button
                            className="button cancel-btn"
                            onClick={() => dispatch(cancelAppointment(appt.id))}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {appt.status !== "reschedule_requested" && (
                        <button
                          className="button reschedule-btn"
                          onClick={() => setRescheduleId(appt.id)}
                        >
                          Reschedule
                        </button>
                      )}

                      {rescheduleId === appt.id && (
                        <div className="reschedule-inputs">
                          <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                          />
                          <div className="reschedule-times">
                            {timeSlots.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => setNewTime(slot)}
                                className={`button ${
                                  newTime === slot ? "selected-time" : ""
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                          <button
                            className="button confirm-btn"
                            onClick={() => {
                              if (!newDate || !newTime) {
                                alert("Please select date & time");
                                return;
                              }
                              dispatch(
                                rescheduleAppointment({
                                  id: appt.id,
                                  newDate,
                                  newTime,
                                })
                              );
                              setRescheduleId(null);
                              setNewDate("");
                              setNewTime("");
                            }}
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button className="back-btn" onClick={() => setSelectedDoctor(null)}>
            Back to Doctor List
          </button>
        </div>
      )}
    </div>
  );
}
 