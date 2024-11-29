import { motion } from 'framer-motion';
import { useState } from 'react';

const RSVPForm = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendees: 1,
    dietaryRestrictions: '',
    specialRequirements: '',
    volunteer: false
  });

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ ...formState, isSubmitting: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormState({
      isSubmitting: false,
      isSubmitted: true,
      error: null
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (formState.isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold text-neutral-800 mb-2">You're Registered!</h3>
        <p className="text-neutral-600 mb-4">
          Thank you for registering for {event.title}. We've sent a confirmation email with all the details.
        </p>
        <div className="bg-neutral-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-neutral-800 mb-2">Quick Details:</h4>
          <p className="text-sm text-neutral-600">
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
            <br />
            {event.location}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
        >
          Close
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4 p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-neutral-800 mb-2">{event.title}</h3>
        <p className="text-neutral-600 text-sm">
          {new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
          Full Name
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
          Email Address
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
          Phone Number
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div>
        <label htmlFor="attendees" className="block text-sm font-medium text-neutral-700 mb-1">
          Number of Attendees
        </label>
        <motion.select
          whileFocus={{ scale: 1.01 }}
          id="attendees"
          name="attendees"
          value={formData.attendees}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </motion.select>
      </div>

      <div>
        <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-neutral-700 mb-1">
          Dietary Restrictions
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          placeholder="Vegetarian, Vegan, Gluten-free, etc."
        />
      </div>

      <div>
        <label htmlFor="specialRequirements" className="block text-sm font-medium text-neutral-700 mb-1">
          Special Requirements
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          id="specialRequirements"
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          placeholder="Any accessibility requirements or special accommodations needed?"
        />
      </div>

      <div className="flex items-center space-x-2">
        <motion.input
          whileHover={{ scale: 1.1 }}
          type="checkbox"
          id="volunteer"
          name="volunteer"
          checked={formData.volunteer}
          onChange={handleChange}
          className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
        />
        <label htmlFor="volunteer" className="text-sm text-neutral-600">
          I'm interested in volunteering at this event
        </label>
      </div>

      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={formState.isSubmitting}
          className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState.isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </span>
          ) : (
            'Register Now'
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onClose}
          className="px-6 py-3 rounded-lg font-medium text-neutral-600 hover:bg-neutral-100 transition-colors duration-300"
        >
          Cancel
        </motion.button>
      </div>
    </motion.form>
  );
};

export default RSVPForm;
