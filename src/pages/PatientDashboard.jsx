import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { bookAppointment, cancelAppointment } from "../redux/slice/appointmentSlice";

export default function PatientDashboard() {
  const dispatch = useDispatch();
  const { doctors } = useSelector(state => state.doctors);
  const { appointments, patients } = useSelector(state => state.appointments);
  const { user } = useSelector(state => state.auth);

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = () => {
    if (!doctorId || !date || !time) return alert("Select all fields");
    dispatch(bookAppointment({ patientId: user.id, doctorId: Number(doctorId), date, time }));
  };

  const patientAppointments = appointments.filter(a => a.patientId === user.id);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome {user.name} (Patient)</h2>

      <h3>Book Appointment</h3>
      <select onChange={e => setDoctorId(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <button onClick={handleBook}>Book</button>

      <h3>My Appointments</h3>
      <ul>
        {patientAppointments.map(a => {
          const doctor = doctors.find(d => d.id === a.doctorId);
          return (
            <li key={a.id}>
              Dr. {doctor?.name} on {a.date} at {a.time}
              <button onClick={() => dispatch(cancelAppointment(a.id))}>Cancel</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
