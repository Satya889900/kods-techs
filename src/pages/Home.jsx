import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDoctor } from "../redux/slice/doctorSlice";
import { useNavigate } from "react-router-dom";
import './Home.css';

export default function Home() {
  const doctors = useSelector((state) => state.doctor?.doctors || []);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const carouselImages = [
    "https://media.gettyimages.com/id/1585069532/photo/portrait-of-a-doctor-listening-to-a-patients-heartbeat.jpg?s=612x612&w=0&k=20&c=EElCY7w19Cvgb3a3kmxn3zcDMA3fshPTob9i55gURTc=",
    "https://media.gettyimages.com/id/1280865321/photo/he-puts-the-heart-into-the-healthcare-industry.jpg?s=612x612&w=0&k=20&c=QuxlBDGxz_0FC8jDpRMD_GA59Q7kXlYsrySMYgjwvYI=",
    "https://media.gettyimages.com/id/1490665620/photo/portrait-of-female-doctor-holding-cardiologist-heart.jpg?s=612x612&w=0&k=20&c=GdHule3uR-OO8IDW72DLqZ6bBctg5XYzhPEkl0qdy5U="
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCarousel50Index, setCurrentCarousel50Index] = useState(0);
  const [sideIndex, setSideIndex] = useState(0);
  const [hospitalIndex, setHospitalIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [isSideCarouselPaused, setIsSideCarouselPaused] = useState(false);
  const [isTestimonialCarouselPaused, setIsTestimonialCarouselPaused] = useState(false);
  const [isServiceCarouselPaused, setIsServiceCarouselPaused] = useState(false);

  useEffect(() => {
    const intervals = [
      setInterval(() => setCurrentIndex((prev) => (prev + 1) % carouselImages.length), 4000),
      setInterval(() => setCurrentCarousel50Index((prev) => (prev + 1) % carousel50Images.length), 4500),
      setInterval(() => {
        if (!isSideCarouselPaused) {
          setSideIndex((prev) => (prev + 1) % sideCarouselImages.length);
        }
      }, 3500),
      setInterval(() => setHospitalIndex((prev) => (prev + 1) % hospitalSlides.length), 4500),
      setInterval(() => {
        if (!isTestimonialCarouselPaused) {
          setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        }
      }, 5000),
      setInterval(() => {
        if (!isServiceCarouselPaused) {
          setServiceIndex((prev) => (prev + 1) % services.length);
        }
      }, 4500),
    ];
    return () => intervals.forEach(clearInterval);
  }, [isSideCarouselPaused, isTestimonialCarouselPaused, isServiceCarouselPaused]);

  const handleBookNow = (doctor) => {
    if (!user) return alert("Please login to book an appointment.");
    if (user.role !== "patient" && user.role !== "admin") {
      return alert("Only patients or admins can book appointments.");
    }
    dispatch(setSelectedDoctor(doctor));
    navigate(`/patient/book/${doctor.id}`);
  };

  const handleSideCarouselClick = (index) => {
    setSideIndex(index);
    setIsSideCarouselPaused(true);
    setTimeout(() => setIsSideCarouselPaused(false), 5000);
  };

  const handleSideCarouselNav = (direction) => {
    setSideIndex((prev) => {
      const newIndex = direction === 'next'
        ? (prev + 1) % sideCarouselImages.length
        : (prev - 1 + sideCarouselImages.length) % sideCarouselImages.length;
      return newIndex;
    });
    setIsSideCarouselPaused(true);
    setTimeout(() => setIsSideCarouselPaused(false), 5000);
  };

  const handleTestimonialCarouselNav = (direction) => {
    setTestimonialIndex((prev) => {
      const newIndex = direction === 'next'
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length;
      return newIndex;
    });
    setIsTestimonialCarouselPaused(true);
    setTimeout(() => setIsTestimonialCarouselPaused(false), 5000);
  };

  const handleServiceCarouselNav = (direction) => {
    setServiceIndex((prev) => {
      const newIndex = direction === 'next'
        ? (prev + 1) % services.length
        : (prev - 1 + services.length) % services.length;
      return newIndex;
    });
    setIsServiceCarouselPaused(true);
    setTimeout(() => setIsServiceCarouselPaused(false), 5000);
  };

  const carousel50Images = Array.from({ length: 50 }, (_, i) => ({
    src: `https://picsum.photos/600/400?random=${i + 1}`,
    text: `Information about Image ${i + 1}`
  }));

  const sideCarouselImages = Array.from({ length: 5 }, (_, i) => ({
    src: `https://picsum.photos/200/200?random=${i + 1}`,
    text: `Info about side image ${i + 1}`
  }));

  const hospitalSlides = [
    {
      src: "https://media.istockphoto.com/id/1530779020/photo/surgeon-wearing-ar-headset-and-using-high-precision-remote-controlled-robot-arms-to-operate.jpg?s=1024x1024&w=is&k=20&c=NY0MX-3urU3aHgRk_4mVU43AQElcu7fQC4-0JXXPDsc=",
      title: "State-of-the-Art Equipment",
      description: "Our hospital is equipped with the latest medical technology."
    },
    {
      src: "https://media.istockphoto.com/id/1012405368/photo/scientists-in-laboratory-working-on-research.jpg?s=612x612&w=0&k=20&c=qGuh-kPQ2EBLU1dHZ2aMv5CDAt4pv6uTr-oRdOZO2Ck=",
      title: "Expert Doctors",
      description: "Team of highly qualified and experienced doctors."
    },
    {
      src: "https://media.istockphoto.com/id/1487911845/vector/24-hours-medical-servises-24-7-medical-call-center-emergency-patient-support-first-aid.jpg?s=612x612&w=0&k=20&c=GKVVUBkFftFingkVWlDBS1PMVPNBe8qszXqrwFyqAyE=",
      title: "24/7 Patient Care",
      description: "Round-the-clock attention to all our patients."
    }
  ];

  const testimonials = [
    {
      name: "John Doe",
      quote: "The care I received was exceptional. The doctors were attentive and professional!",
      avatar: "👨"
    },
    {
      name: "Jane Smith",
      quote: "Booking an appointment was so easy, and the staff was incredibly helpful.",
      avatar: "👩"
    },
    {
      name: "Alex Brown",
      quote: "Top-notch facilities and compassionate care. Highly recommend this hospital!",
      avatar: "🧑"
    }
  ];

  const services = [
    {
      src: "https://picsum.photos/400/300?random=101",
      title: "Cardiology",
      description: "Advanced heart care with state-of-the-art diagnostics."
    },
    {
      src: "https://picsum.photos/400/300?random=102",
      title: "Neurology",
      description: "Expert treatment for neurological conditions."
    },
    {
      src: "https://picsum.photos/400/300?random=103",
      title: "Orthopedics",
      description: "Comprehensive care for bones and joints."
    }
  ];

  return (
    <div className="home-container">
      {/* Top Carousel */}
      <section className="top-carousel relative shadow-2xl">
        <div className="carousel-image-wrapper">
          {carouselImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Banner ${i + 1}`}
              className={`carousel-image ${i === currentIndex ? 'active' : ''}`}
              loading="lazy"
            />
          ))}
        </div>
        <div className="top-carousel-overlay">
          <h1 className="home-title">🏥 Welcome to Hospital Appointment System</h1>
          <p className="home-subtitle">Book appointments with our experienced doctors easily!</p>
        </div>

        {/* Side Carousel */}
        <aside
          className="home-side-carousel"
          onMouseEnter={() => setIsSideCarouselPaused(true)}
          onMouseLeave={() => setIsSideCarouselPaused(false)}
        >
          {sideCarouselImages.map((img, i) => (
            <div
              key={i}
              className={`side-carousel-item ${i === sideIndex ? "active" : ""}`}
              onClick={() => handleSideCarouselClick(i)}
              tabIndex="0"
              role="button"
              aria-label={`View side carousel image ${i + 1}: ${img.text}`}
              onKeyDown={(e) => e.key === 'Enter' && handleSideCarouselClick(i)}
            >
              <img src={img.src} alt={`Side ${i + 1}`} loading="lazy" />
              <p>{img.text}</p>
            </div>
          ))}
          <div className="side-carousel-nav">
            <button
              className="side-carousel-nav-btn prev"
              onClick={() => handleSideCarouselNav('prev')}
              aria-label="Previous side carousel image"
            >
              ❮
            </button>
            <button
              className="side-carousel-nav-btn next"
              onClick={() => handleSideCarouselNav('next')}
              aria-label="Next side carousel image"
            >
              ❯
            </button>
          </div>
        </aside>
      </section>

      {/* 50-Image Carousel */}
      <section className="carousel50-container">
        <div className="carousel50-wrapper">
          {carousel50Images.map((img, i) => (
            <div
              key={i}
              className={`carousel50-item shadow-2xl ${i === currentCarousel50Index ? 'active' : ''}`}
            >
              <img src={img.src} alt={`Slide ${i + 1}`} loading="lazy" />
              <div className="carousel50-overlay">
                <p>{img.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        {[
          {
            img: "https://www.sakraworldhospital.com/assets/images/qualified-doctors.svg",
            title: "Qualified Doctors",
            desc: "Highly skilled Doctors, Nurses"
          },
          {
            img: "https://www.sakraworldhospital.com/assets/images/trusted-treatment.svg",
            title: "Trusted Treatment",
            desc: "Our Hospital has all the necessary facilities"
          },
          {
            img: "https://www.sakraworldhospital.com/assets/images/24x7-services.svg",
            title: "24/7 Services",
            desc: "Sakra provides round the clock medical services"
          }
        ].map((feature, idx) => (
          <div
            key={idx}
            className="feature-card"
            tabIndex="0"
            aria-label={feature.title}
          >
            <img src={feature.img} alt={feature.title} loading="lazy" />
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Hospital Carousel Section */}
      <h1 className="hospital-carousel-title">Best Multispeciality Hospital In India</h1>
      <section className="hospital-carousel shadow-xl">
        <div className="hospital-carousel-left">
          {hospitalSlides.map((slide, i) => (
            <img
              key={i}
              src={slide.src}
              alt={slide.title}
              className={`hospital-carousel-image ${i === hospitalIndex ? 'active' : ''}`}
              loading="lazy"
            />
          ))}
        </div>
        <div className="hospital-carousel-right">
          <h2>{hospitalSlides[hospitalIndex].title}</h2>
          <p>{hospitalSlides[hospitalIndex].description}</p>
        </div>
      </section>

      {/* Doctors Section */}
      <h2 className="doctor-section-title">Our Doctors</h2>
      <section className="doctor-cards">
        {doctors.map((doctor, idx) => (
          <article
            key={doctor.id}
            className="doctor-card"
            tabIndex="0"
            aria-label={`Doctor ${doctor.name}, specialization ${doctor.specialization}`}
            onClick={() => handleBookNow(doctor)}
          >
            <div className="doctor-avatar" aria-hidden="true">👨‍⚕️</div>
            <h3>{doctor.name}</h3>
            <p>Specialization: {doctor.specialization}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleBookNow(doctor);
              }}
            >
              Book Now
            </button>
          </article>
        ))}
      </section>

      {/* Testimonials Slider */}
      <h2 className="testimonial-section-title">What Our Patients Say</h2>
      <section
        className="testimonial-slider"
        onMouseEnter={() => setIsTestimonialCarouselPaused(true)}
        onMouseLeave={() => setIsTestimonialCarouselPaused(false)}
      >
        <div className="testimonial-wrapper">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`testimonial-item ${i === testimonialIndex ? 'active' : ''}`}
              tabIndex="0"
              aria-label={`Testimonial from ${testimonial.name}`}
            >
              <div className="testimonial-avatar">{testimonial.avatar}</div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <h3 className="testimonial-name">{testimonial.name}</h3>
            </div>
          ))}
        </div>
        <div className="testimonial-carousel-nav">
          <button
            className="testimonial-carousel-nav-btn prev"
            onClick={() => handleTestimonialCarouselNav('prev')}
            aria-label="Previous testimonial"
          >
            ❮
          </button>
          <button
            className="testimonial-carousel-nav-btn next"
            onClick={() => handleTestimonialCarouselNav('next')}
            aria-label="Next testimonial"
          >
            ❯
          </button>
        </div>
      </section>

      {/* Services Slider */}
      <h2 className="services-section-title">Our Services</h2>
      <section
        className="services-slider"
        onMouseEnter={() => setIsServiceCarouselPaused(true)}
        onMouseLeave={() => setIsServiceCarouselPaused(false)}
      >
        <div className="services-wrapper">
          {services.map((service, i) => (
            <div
              key={i}
              className={`services-item ${i === serviceIndex ? 'active' : ''}`}
              tabIndex="0"
              aria-label={`Service: ${service.title}`}
            >
              <img src={service.src} alt={service.title} loading="lazy" />
              <div className="services-overlay">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="services-carousel-nav">
          <button
            className="services-carousel-nav-btn prev"
            onClick={() => handleServiceCarouselNav('prev')}
            aria-label="Previous service"
          >
            ❮
          </button>
          <button
            className="services-carousel-nav-btn next"
            onClick={() => handleServiceCarouselNav('next')}
            aria-label="Next service"
          >
            ❯
          </button>
        </div>
      </section>
    </div>
  );
}