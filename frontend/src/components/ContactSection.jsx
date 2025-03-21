import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message: `Failed to send message: ${error.message}. Please try again.`,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-bold text-gray-900 text-3xl md:text-4xl mb-4">
            {"Let's Connect"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Have a project in mind or just want to say hi? {"I'd"} love to hear
            from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2 text-left"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Codeo ReStart"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 text-left"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="codeosocials@gmail.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2 text-left"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Hi there, I'd like to talk about..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status.message && (
                <div className={`p-4 rounded-lg ${
                  status.type === 'success' ? 'bg-green-50 text-green-800' : 
                  status.type === 'error' ? 'bg-red-50 text-red-800' : 
                  'bg-blue-50 text-blue-800'
                }`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-50 rounded-lg">
                  <i className="fas fa-map-marker-alt text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">Location</h3>
                  <p className="text-gray-600">Kumasi, Ghana</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Open to remote work worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-50 rounded-lg">
                  <i className="fas fa-envelope text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">Email</h3>
                  <p className="text-gray-600">mustaphahaadi04@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Typically responds within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-50 rounded-lg">
                  <i className="fas fa-phone-alt text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">Phone</h3>
                  <p className="text-gray-600">+233 (0) 548-367-637</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available Mon-Fri, 9am-5pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-50 rounded-lg">
                  <i className="fas fa-calendar-alt text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">
                    Schedule Meeting
                  </h3>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Book a call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
