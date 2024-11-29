import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-handwritten text-primary-dark mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg">
            <p className="text-neutral-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-neutral-600 mb-6">
              We collect information that you voluntarily provide to us when you use our website,
              including when you sign up for our newsletter, register for events, or contact us
              through our forms.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-neutral-600 mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-600">
              <li>Communicate with you about our programs and events</li>
              <li>Process your donations and registrations</li>
              <li>Send you our newsletter (if you've subscribed)</li>
              <li>Improve our website and services</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-neutral-600 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to outside
              parties. This does not include trusted third parties who assist us in operating our
              website or serving you.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              4. Data Security
            </h2>
            <p className="text-neutral-600 mb-6">
              We implement appropriate security measures to maintain the safety of your personal
              information. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              5. Your Rights
            </h2>
            <p className="text-neutral-600 mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-neutral-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              6. Contact Us
            </h2>
            <p className="text-neutral-600">
              If you have any questions about this Privacy Policy, please contact us through
              our contact form or email us at privacy@helpfoundation.org.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Privacy;
