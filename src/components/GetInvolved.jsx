import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SignUpForm from './SignUpForm';
import Testimonials from './Testimonials';

const involvementOptions = [
  {
    id: 'volunteer',
    title: 'Volunteer',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
    ),
    description: 'Join our community of dedicated volunteers making a difference across the globe.',
    details: [
      'Local community outreach',
      'International programs',
      'Skill-based volunteering',
      'Virtual opportunities'
    ],
    stats: {
      value: '5000+',
      label: 'Active Volunteers'
    },
    color: 'primary',
    action: 'Apply Now'
  },
  {
    id: 'donate',
    title: 'Donate',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
    ),
    description: 'Support our mission with a one-time or recurring donation to create lasting change.',
    details: [
      'Monthly giving program',
      'Corporate matching',
      'Legacy giving',
      'Specific project funding'
    ],
    stats: {
      value: '$2.5M+',
      label: 'Raised This Year'
    },
    color: 'accent-yellow',
    action: 'Donate Now'
  },
  {
    id: 'partner',
    title: 'Partner',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
    ),
    description: 'Collaborate with us to create sustainable impact through strategic partnerships.',
    details: [
      'Corporate partnerships',
      'NGO collaborations',
      'Research institutions',
      'Government agencies'
    ],
    stats: {
      value: '150+',
      label: 'Active Partners'
    },
    color: 'secondary',
    action: 'Partner With Us'
  }
];

const GetInvolved = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCardClick = (id) => {
    setSelectedCard(selectedCard === id ? null : id);
  };

  const handleActionClick = (e, category) => {
    e.stopPropagation();
    setActiveCategory(category);
    setShowForm(true);
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-handwritten text-primary-dark mb-4">
            Get Involved
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Join us in making a difference. There are many ways you can contribute to our mission 
            and help create positive change in communities worldwide.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {involvementOptions.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => handleCardClick(option.id)}
              onHoverStart={() => setHoveredCard(option.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer
                transform transition-all duration-300 hover:shadow-2xl
                ${selectedCard === option.id ? 'ring-2 ring-offset-2' : ''}
                ${option.color === 'primary' ? 'ring-primary' : 
                  option.color === 'accent-yellow' ? 'ring-accent-yellow' : 'ring-secondary'}`}
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Icon and Title */}
                <div className={`text-${option.color} mb-6`}>
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                  {option.title}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {option.description}
                </p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-neutral-50 rounded-lg p-4 mb-6"
                >
                  <div className="text-2xl font-bold text-primary">
                    {option.stats.value}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {option.stats.label}
                  </div>
                </motion.div>

                {/* Details List */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: selectedCard === option.id ? 1 : 0,
                    height: selectedCard === option.id ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 mb-6">
                    {option.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-neutral-600"
                      >
                        <svg className="w-4 h-4 mr-2 text-accent-yellow" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleActionClick(e, option.id)}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white
                    transition-colors duration-300 ${
                      option.color === 'primary' ? 'bg-primary hover:bg-primary-dark' :
                      option.color === 'accent-yellow' ? 'bg-accent-yellow hover:bg-accent-yellow/90' :
                      'bg-secondary hover:bg-secondary-dark'
                    }`}
                >
                  {option.action}
                </motion.button>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === option.id ? 0.05 : 0 }}
                className={`absolute inset-0 ${
                  option.color === 'primary' ? 'bg-primary' :
                  option.color === 'accent-yellow' ? 'bg-accent-yellow' :
                  'bg-secondary'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        {/* <Testimonials /> */}

        {/* Modal Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full m-4"
                onClick={(e) => e.stopPropagation()}
              >
                <SignUpForm
                  category={activeCategory}
                  onClose={() => setShowForm(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-neutral-600 mb-6">
            Not sure how to get involved? Contact us and we'll help you find the perfect way to contribute.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#5E6C56] text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default GetInvolved;
