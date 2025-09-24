import React from "react";
import "./Help.css"; // optional CSS for styling

export default function Help() {
  return (
    <div className="help-container">
      <h1>❓ Help & Support</h1>
      <p>Welcome to the Hospital Appointment System Help page.</p>

      <section className="help-section">
        <h2>🔑 Login Issues</h2>
        <p>
          - Make sure you enter the correct email and password.<br />
          - If you forgot your password, please contact the admin.
        </p>
      </section>

      <section className="help-section">
        <h2>📅 Booking Appointments</h2>
        <p>
          - Patients can book appointments with available doctors.<br />
          - Select a doctor from the <strong>Home</strong> page and click
          <em> Book Now</em>.
        </p>
      </section>

      <section className="help-section">
        <h2>👨‍⚕️ Adding Doctors</h2>
        <p>
          - Only Admin can add doctors via the <strong>Add Doctor</strong> page.<br />
          - Fill in the details (name, specialization, available dates).
        </p>
      </section>

      <section className="help-section">
        <h2>📌 Need More Help?</h2>
        <p>
          Contact our support team:<br />
          📧 Email: support@hospital.com<br />
          📞 Phone: +91 98765 43210
        </p>
      </section>
    </div>
  );
}
