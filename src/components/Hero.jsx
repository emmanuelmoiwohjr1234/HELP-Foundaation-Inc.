import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUserPreferences } from '../contexts/UserPreferences';
import useImagePreload from '../hooks/useImagePreload';
import { 
  optimizeImageUrl, 
  IMAGE_SIZES, 
  IMAGE_QUALITY,
  generateSrcSet,
  generateSizes,
  preloadCriticalImages
} from '../utils/imageOptimizer';

const slides = [
  {
    id: 0,
    title: "Welcome to HELP Foundation Inc.",
    subtitle: "Empowering Communities, Transforming Lives",
    description: "Join us in our mission to create positive change and build stronger communities together. Partner with us to make a difference.",
    backgroundImage: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&q=80",
    cta: { text: "Join Us", link: "/get-involved" },
    overlayColor: "from-[#4C6B54]/80",
    gradientTo: "to-[#4C6B54]/40",
  },
  {
    id: 1,
    title: "Supporting Those in Need",
    subtitle: "Making a Difference Through Charity",
    description: "Our charitable initiatives focus on providing essential resources and support to vulnerable communities. Every contribution counts.",
    backgroundImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80",
    cta: { text: "Donate Now", link: "/donate" },
    overlayColor: "from-[#8E7455]/80",
    gradientTo: "to-[#8E7455]/40",
  },
  {
    id: 2,
    title: "Clean Water Initiative",
    subtitle: "Access to Safe Water & Sanitation",
    description: "We're committed to providing clean water and proper sanitation facilities to communities in need. Help us create healthier environments.",
    backgroundImage: "https://images.unsplash.com/photo-1504490874612-0bc83c63832f?auto=format&fit=crop&q=80",
    cta: { text: "Learn More", link: "/programs/water" },
    overlayColor: "from-[#599CC1]/80",
    gradientTo: "to-[#599CC1]/40",
  },
  {
    id: 3,
    title: "Sustainable Agriculture",
    subtitle: "Growing Food, Growing Hope",
    description: "Our agricultural programs empower communities with sustainable farming practices and food security initiatives.",
    backgroundImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80",
    cta: { text: "View Programs", link: "/programs/agriculture" },
    overlayColor: "from-[#E9B12F]/80",
    gradientTo: "to-[#E9B12F]/40",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { reducedMotion } = useUserPreferences();
  
  // Preload all hero images
  const { imagesLoaded } = useImagePreload(slides.map(slide => slide.backgroundImage));

  // Preload critical images on mount
  useEffect(() => {
    preloadCriticalImages([slides[0].backgroundImage, slides[1].backgroundImage]);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000);

    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].backgroundImage})`,
              transition: 'transform 6s ease-in-out',
            }}
          >
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b ${slides[currentSlide].overlayColor} ${slides[currentSlide].gradientTo}`} />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-4xl"
              >
                <h2 className="text-5xl md:text-7xl font-handwritten text-white mb-4 drop-shadow-lg">
                  {slides[currentSlide].title}
                </h2>
                
                <h3 className="text-2xl md:text-3xl text-white/90 mb-6 drop-shadow-md font-medium">
                  {slides[currentSlide].subtitle}
                </h3>
                
                <p className="text-lg md:text-xl text-white/80 mb-8 drop-shadow-md">
                  {slides[currentSlide].description}
                </p>
                
                <Link
                  to={slides[currentSlide].cta.link}
                  className="inline-block px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg
                    font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {slides[currentSlide].cta.text}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
