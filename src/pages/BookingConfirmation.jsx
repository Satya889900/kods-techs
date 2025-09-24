// src/pages/BookingConfirmation.jsx
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookingConfirmation() {
  const { doctorId, patientId, date, time } = useParams();
  const { doctors } = useSelector(state => state.doctors);
  const { patients } = useSelector(state => state.auth);

  const doctor = doctors.find(d => d.id === Number(doctorId));
  const patient = patients.find(p => p.id === Number(patientId));

  if (!doctor || !patient) return <h3>Details not found!</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Appointment Confirmed!</h2>
      <h3>Patient Details:</h3>
      <p>Name: {patient.name}</p>
      <p>Email: {patient.email}</p>

      <h3>Doctor Details:</h3>
      <p>Name: Dr. {doctor.name}</p>
      <p>Specialization: {doctor.specialization}</p>

      <h3>Appointment:</h3>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
    </div>
  );
}
