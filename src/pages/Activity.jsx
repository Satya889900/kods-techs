// src/pages/Activity.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { confirmReschedule } from "../redux/slice/appointmentSlice";

export default function Activity() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const doctors = useSelector((state) => state.doctor?.doctors || []);
  const appointments = useSelector(
    (state) => state.appointment?.appointments || []
  );

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#fff9c4"; // light yellow
      case "booked":
        return "#fffde7"; // yellow
      case "confirmed":
        return "#e8f5e9"; // green
      case "reschedule_requested":
        return "#fff3e0"; // orange for doctor requested
      case "rescheduled":
        return "#e3f2fd"; // blue for confirmed reschedule
      case "canceled":
        return "#ffebee"; // red
      default:
        return "#ffffff";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "pending":
      case "booked":
        return "#f57f17";
      case "confirmed":
      case "rescheduled":
        return "green";
      case "reschedule_requested":
        return "#ff9800";
      case "canceled":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div className="activity-page" style={{ padding: "20px" }}>
      <h2>Activity Dashboard</h2>

      {/* Doctor Details Section */}
      <section className="doctor-section" style={{ marginTop: "20px" }}>
        <h3>Doctors</h3>
        <div
          className="doctor-cards"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="doctor-card"
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "10px",
                width: "220px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h4>{doc.name}</h4>
              <p>Specialization: {doc.specialization}</p>
              
            </div>
          ))}
        </div>
      </section>

      {/* Appointments Section */}
      <section className="appointments-section" style={{ marginTop: "40px" }}>
        <h3>All Appointments</h3>
        <div
          className="appointment-cards"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="appointment-card"
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "10px",
                width: "250px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                backgroundColor: getStatusColor(appt.status),
              }}
            >
              <h4>Patient: {appt.patientName}</h4>
              <p>Doctor: {appt.doctorName}</p>
              <p>Date: {appt.date}</p>
              <p>Time: {appt.time}</p>
              <p>
                Status:{" "}
                <strong style={{ color: getStatusTextColor(appt.status) }}>
                  {appt.status}
                </strong>
              </p>

              {/* Show confirm button only if doctor requested reschedule */}
              {appt.status === "reschedule_requested" &&
                user &&
                (user.role === "patient" || user.role === "admin") && (
                  <button
                    onClick={() => dispatch(confirmReschedule(appt.id))}
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#1565c0",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Confirm New Time
                  </button>
                )}
            </div>
          ))}
        </div>
        {appointments.length === 0 && <p>No appointments available.</p>}
      </section>
    </div>
  );
}
