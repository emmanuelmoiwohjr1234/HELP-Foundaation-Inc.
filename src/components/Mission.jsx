import { motion } from 'framer-motion';
import { useUserPreferences } from '../contexts/UserPreferences';
import useImagePreload from '../hooks/useImagePreload';
import { 
  optimizeImageUrl, 
  IMAGE_SIZES, 
  IMAGE_QUALITY,
  generateSrcSet,
  generateSizes 
} from '../utils/imageOptimizer';

// Optimized image URLs
const MISSION_IMAGES = {
  main: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
  support: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
  values: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b"
};

const Mission = () => {
  const { reducedMotion } = useUserPreferences();
  
  // Preload all mission images
  const { imagesLoaded } = useImagePreload(Object.values(MISSION_IMAGES));

  const stats = [
    { value: '10K+', label: 'Lives Impacted', icon: '❤️' },
    { value: '50+', label: 'Communities Served', icon: '🌍' },
    { value: '100+', label: 'Volunteers', icon: '🤝' },
    { value: '$1M+', label: 'Funds Raised', icon: '💰' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.5,
      },
    },
  };

  // Generate responsive image attributes
  const mainImageSrcSet = generateSrcSet(MISSION_IMAGES.main, [600, 800, 1200]);
  const supportImageSrcSet = generateSrcSet(MISSION_IMAGES.support, [400, 600, 800]);
  const valuesImageSrcSet = generateSrcSet(MISSION_IMAGES.values, [400, 600, 800]);

  const sizes = generateSizes({
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  });

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        {/* Mission & Vision Section with Image */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Content Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex-1 space-y-12"
          >
            {/* Mission Section */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-handwritten mb-6 text-[rgb(var(--color-primary))]">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-700">
                Empowering communities through sustainable development and creating lasting positive change
                in the lives of those we serve. We strive to build stronger, more resilient communities
                through education, healthcare, and environmental initiatives.
              </p>
            </motion.div>

            {/* Vision Section */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-handwritten mb-6 text-[rgb(var(--color-secondary))]">
                Our Vision
              </h2>
              <p className="text-lg text-neutral-700">
                A world where every community thrives with equal access to opportunities, resources, and
                sustainable solutions. We envision a future where social equity, environmental
                consciousness, and economic prosperity go hand in hand.
              </p>
            </motion.div>

            {/* Values Section */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-handwritten mb-6 text-[rgb(var(--color-accent))]">
                Our Values
              </h2>
              <ul className="grid grid-cols-2 gap-4 text-lg text-neutral-700">
                <li className="flex items-center gap-2">
                  <span className="text-[rgb(var(--color-primary))]">✦</span>
                  Integrity
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[rgb(var(--color-primary))]">✦</span>
                  Compassion
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[rgb(var(--color-primary))]">✦</span>
                  Innovation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[rgb(var(--color-primary))]">✦</span>
                  Sustainability
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex-1 grid grid-cols-2 gap-4 lg:gap-6"
          >
            {/* Mission Image */}
            <motion.div
              variants={itemVariants}
              className="col-span-2 relative rounded-2xl overflow-hidden h-64 lg:h-80"
            >
              <img
                src={optimizeImageUrl(MISSION_IMAGES.main, { width: IMAGE_SIZES.large, quality: IMAGE_QUALITY.high })}
                srcSet={mainImageSrcSet}
                sizes={sizes}
                alt="Community Impact"
                className="absolute inset-0 w-[100%] h-[100%] object-cover gpu"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Vision Image */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden h-48 lg:h-64"
            >
              <img
                src={optimizeImageUrl(MISSION_IMAGES.support, { width: IMAGE_SIZES.medium, quality: IMAGE_QUALITY.high })}
                srcSet={supportImageSrcSet}
                sizes={sizes}
                alt="Community Support"
                className="absolute inset-0 w-full h-full object-cover gpu"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Values Image */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden h-48 lg:h-64"
            >
              <img
                src={optimizeImageUrl(MISSION_IMAGES.values, { width: IMAGE_SIZES.medium, quality: IMAGE_QUALITY.high })}
                srcSet={valuesImageSrcSet}
                sizes={sizes}
                alt="Community Values"
                className="absolute inset-0 w-full h-full object-cover gpu"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-[rgb(var(--color-primary))] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
