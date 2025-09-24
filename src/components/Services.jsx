const services = [
  { title: "Emergency Department", icon: "🚨" },
  { title: "Pediatric Department", icon: "👶" },
  { title: "General Physician", icon: "🩺" },
  { title: "Neurology Department", icon: "🧠" },
  { title: "Cardiology Department", icon: "❤️" },
];

export default function Services() {
  return (
    <section className="services py-20 px-10 bg-white">
      <h2 className="text-3xl font-bold mb-3">Our Healthcare Service</h2>
      <p className="mb-10 text-gray-600">It is a long established fact that a reader will be distracted...</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {services.map((s, idx) => (
          <div key={idx} className="service-card p-5 text-center shadow-md rounded-lg hover:bg-blue-600 hover:text-white transition">
            <div className="text-4xl mb-3">{s.icon}</div>
            <h3 className="font-bold">{s.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
