import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-handwritten text-primary-dark mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg">
            <p className="text-neutral-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-neutral-600 mb-6">
              By accessing and using this website, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              2. Use License
            </h2>
            <p className="text-neutral-600 mb-6">
              Permission is granted to temporarily download one copy of the materials on HELP
              Foundation's website for personal, non-commercial transitory viewing only.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              3. Disclaimer
            </h2>
            <p className="text-neutral-600 mb-6">
              The materials on HELP Foundation's website are provided on an 'as is' basis.
              HELP Foundation makes no warranties, expressed or implied, and hereby disclaims
              and negates all other warranties including, without limitation, implied warranties
              or conditions of merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              4. Limitations
            </h2>
            <p className="text-neutral-600 mb-6">
              In no event shall HELP Foundation or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or profit, or due to
              business interruption) arising out of the use or inability to use the materials
              on HELP Foundation's website.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              5. Accuracy of Materials
            </h2>
            <p className="text-neutral-600 mb-6">
              The materials appearing on HELP Foundation's website could include technical,
              typographical, or photographic errors. HELP Foundation does not warrant that
              any of the materials on its website are accurate, complete, or current.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              6. Links
            </h2>
            <p className="text-neutral-600 mb-6">
              HELP Foundation has not reviewed all of the sites linked to its website and
              is not responsible for the contents of any such linked site. The inclusion of
              any link does not imply endorsement by HELP Foundation of the site.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              7. Modifications
            </h2>
            <p className="text-neutral-600 mb-6">
              HELP Foundation may revise these terms of service for its website at any time
              without notice. By using this website, you are agreeing to be bound by the
              then current version of these terms of service.
            </p>

            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              8. Governing Law
            </h2>
            <p className="text-neutral-600">
              These terms and conditions are governed by and construed in accordance with
              the laws and you irrevocably submit to the exclusive jurisdiction of the
              courts in that location.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terms;
