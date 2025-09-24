export default function TopBar() {
  return (
    <div className="topbar flex justify-between items-center px-5 py-1 bg-blue-600 text-white text-sm">
      <div className="social-icons flex gap-3">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-pinterest"></i>
      </div>
      <div className="contact flex gap-5">
        <span>📞 +1-123-456-5523</span>
        <span>✉ support@example.com</span>
      </div>
    </div>
  );
}
