// src/pages/BookAppointment.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAppointment } from "../redux/slice/appointmentSlice";
import { useNavigate } from "react-router-dom";

export default function BookAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedDoctor = useSelector((state) => state.doctor.selectedDoctor);
  const user = useSelector((state) => state.auth.user);
  const appointments = useSelector((state) => state.appointment.appointments);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!selectedDoctor) {
    return <h2>No doctor selected. Please go back and choose one.</h2>;
  }

  // Fixed time slots
  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM"];

  // Filter already booked slots for this doctor and date
  const bookedSlots = appointments
    .filter(
      (appt) =>
        appt.doctorName === selectedDoctor.name &&
        appt.date === date &&
        appt.status !== "canceled"
    )
    .map((appt) => appt.time);

  const handleBook = () => {
    if (!date || !time) return alert("Please select a date and time");

    dispatch(
      addAppointment({
        patientName: user.name,
        doctorName: selectedDoctor.name,
        date,
        time,
      })
    );

    alert("Appointment booked successfully! Waiting for doctor confirmation.");
    navigate("/home"); // redirect after booking
  };

  return (
    <div className="book-appointment" style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Book Appointment with {selectedDoctor.name}</h2>

      {/* Select Date */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Date: </label>
        <input
  type="date"
  value={date}
  min={new Date().toISOString().split("T")[0]} // ✅ disables past dates
  onChange={(e) => {
    setDate(e.target.value);
    setTime(""); // reset time when date changes
  }}
/>

      </div>

      {/* Show Time Slots after date is selected */}
      {date && (
        <div className="time-slots" style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          {timeSlots.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            return (
              <button
                key={slot}
                disabled={isBooked}
                onClick={() => setTime(slot)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: time === slot ? "2px solid green" : "1px solid black",
                  backgroundColor: isBooked
                    ? "#ddd"
                    : time === slot
                    ? "blue"
                    : "",
                  cursor: isBooked ? "not-allowed" : "pointer",
                }}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}

      {/* Confirm Button */}
      {time && (
        <div style={{ marginTop: "30px" }}>
          <button
            onClick={handleBook}
            style={{
              padding: "12px 25px",
              backgroundColor: "#4caf50",
              color: "brown",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Confirm Appointment ({date} at {time})
          </button>
        </div>
      )}
    </div>
  );
}
