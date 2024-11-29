import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const locations = [
  {
    id: 1,
    name: 'HELP Foundation HQ',
    coordinates: [40.7128, -74.0060],
    address: '123 Hope Street, New York, NY 10001',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 2,
    name: 'Community Center',
    coordinates: [40.7580, -73.9855],
    address: '456 Giving Ave, New York, NY 10002',
    phone: '+1 (555) 987-6543',
  },
];

const faqs = [
  {
    question: 'How can I volunteer with HELP Foundation?',
    answer: 'You can volunteer by filling out our volunteer form in the Get Involved section. We have various opportunities available, from event support to ongoing programs.',
  },
  {
    question: 'What types of donations do you accept?',
    answer: 'We accept monetary donations through our secure online platform, as well as in-kind donations of supplies and equipment. Please contact us for specific donation needs.',
  },
  {
    question: 'How are donations used?',
    answer: '90% of donations go directly to our programs and services. The remaining 10% covers administrative costs and sustainable growth initiatives.',
  },
  {
    question: 'Can I partner with HELP Foundation?',
    answer: 'Yes! We welcome partnerships with organizations that share our vision. Please reach out through our contact form or call our partnership office.',
  },
];

const Contact = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Sending message...' });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-handwritten text-primary-dark mb-4">
            Get in Touch
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Have questions or want to get involved? We'd love to hear from you.
            Reach out through our contact form or visit one of our locations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map and Locations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[600px] bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <MapContainer
              center={[40.7128, -74.0060]}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                      <p className="text-sm text-neutral-600 mb-1">{location.address}</p>
                      <p className="text-sm text-neutral-600">{location.phone}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>

          {/* Contact Form and FAQ */}
          <div className="space-y-8">
            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-neutral-800 mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-neutral-200 last:border-none"
                  >
                    <button
                      className="w-full flex justify-between items-center py-4 text-left"
                      onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                    >
                      <span className="font-medium text-neutral-800">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                        className="text-neutral-500"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {activeQuestion === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 text-neutral-600">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-neutral-800 mb-6">
                Send us a Message
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {formStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg ${
                    formStatus.type === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-neutral-50 text-neutral-800'
                  }`}
                >
                  {formStatus.message}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
