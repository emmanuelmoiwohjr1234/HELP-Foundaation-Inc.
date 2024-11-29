import { motion } from 'framer-motion';
import { useState } from 'react';

const SignUpForm = ({ category, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: category,
    message: '',
    subscribe: false
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
        <h3 className="text-2xl font-bold text-neutral-800 mb-2">Thank You!</h3>
        <p className="text-neutral-600 mb-6">
          We've received your information and will be in touch soon.
        </p>
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
          Phone Number (Optional)
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
          Message
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          placeholder="Tell us how you'd like to get involved..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <motion.input
          whileHover={{ scale: 1.1 }}
          type="checkbox"
          id="subscribe"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
          className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary"
        />
        <label htmlFor="subscribe" className="text-sm text-neutral-600">
          Subscribe to our newsletter for updates
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
              Submitting...
            </span>
          ) : (
            'Submit'
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

export default SignUpForm;
