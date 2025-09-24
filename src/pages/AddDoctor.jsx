import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor } from "../redux/slice/doctorSlice";
import { FaUser, FaStethoscope, FaImage } from "react-icons/fa";
import "./AddDoctor.css";

export default function AddDoctor() {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctor);

  const [doctorData, setDoctorData] = useState({
    name: "",
    specialization: "",
    image: "",
  });

  // Foreground carousel (right panel)
  const carouselImages = [
    "https://media.istockphoto.com/id/1327138855/photo/medical-research-and-medical-care-concept.jpg?s=612x612&w=0&k=20&c=DfCef9N76fS8Rl7c6m0UX4H6K3qvH_dHcUO7IeTISc8=",
    "https://media.istockphoto.com/id/1143699758/photo/a-doctor-sounding-a-medicine-service-structure.jpg?s=1024x1024&w=is&k=20&c=NcrRfN75DTSvrB0Emm6fh8GPA_Ap836CRsRGFJrk4d0=",
    "https://media.istockphoto.com/id/1145062056/photo/a-doctor-operating-with-innovative-medical-service-scheme.jpg?s=1024x1024&w=is&k=20&c=h79_9AoKy3cP4kiKzVxt10DjbiFqzp6LU7rICmdw8a0=",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Background carousel
  const bgImages = [
    "https://media.istockphoto.com/id/1145231454/photo/i-promise-to-get-you-better.jpg?s=1024x1024&w=is&k=20&c=HgEnhoBKAqWYMFCdXS0zB1BBRgAjFRYC3fjkw0jSZxo=",
    "https://media.istockphoto.com/id/1372002649/photo/cropped-portrait-of-an-attractive-young-female-doctor-standing-with-her-arms-folded-in-the.jpg?s=1024x1024&w=is&k=20&c=niAjcE15duRvglNhNz2feYg4Xw21sefc8UkAhGOjUi0=",
    "https://media.istockphoto.com/id/1273663476/photo/female-doctor-outside-hospital.jpg?s=1024x1024&w=is&k=20&c=k98w3WwQlGva8AtEtbyn6EknHefzpj45MsWy7al0h8U=",
  ];
  const [bgIndex, setBgIndex] = useState(0);

  // Foreground carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Background carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctorData.image) {
      doctorData.image = "https://via.placeholder.com/150";
    }
    dispatch(addDoctor(doctorData));
    setDoctorData({ name: "", specialization: "", image: "" });
  };

  return (
    <div className="add-doctor-wrapper">
      {/* Background Carousel */}
      <div
        className="bg-carousel"
        style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
      >
        <div className="overlay"></div>
      </div>

      {/* Foreground content */}
      <div className="add-doctor-container">
        <div className="left-panel">
          <h1>Add Doctor</h1>
          <form onSubmit={handleSubmit} className="doctor-form">
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Doctor Name"
                value={doctorData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <FaStethoscope className="icon" />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={doctorData.specialization}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <FaImage className="icon" />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={doctorData.image}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Add Doctor</button>
          </form>

          <h2>Doctor List</h2>
          <div className="doctor-list">
            {doctors.length === 0 ? (
              <p>No doctors added yet.</p>
            ) : (
              doctors.map((doc, index) => (
                <div className="doctor-card" key={index}>
                  <img src={doc.image} alt={doc.name} className="doctor-img" />
                  <div className="doctor-info">
                    <h3>{doc.name}</h3>
                    <p>{doc.specialization}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel: Foreground carousel */}
        <div className="right-panel">
          {carouselImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i}`}
              className={`carousel-img ${i === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
