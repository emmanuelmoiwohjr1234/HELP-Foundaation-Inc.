import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Volunteer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    quote: 'Volunteering with HELP Foundation has been one of the most rewarding experiences of my life. The impact we make is truly visible.',
    program: 'Education Initiative'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Corporate Partner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    quote: 'Our partnership has enabled us to create sustainable change while engaging our employees in meaningful community work.',
    program: 'Clean Water Project'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Monthly Donor',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    quote: 'Seeing the direct impact of my monthly donations through regular updates makes me proud to be part of this community.',
    program: 'Healthcare Outreach'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="bg-neutral-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-handwritten text-primary-dark mb-4">
            Voices of Impact
          </h3>
          <p className="text-neutral-600">
            Hear from our community members making a difference
          </p>
        </motion.div>

        <div className="relative">
          {/* Testimonials Slider */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg p-8 md:p-12"
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-primary/10"
                        />
                      </div>
                      <div className="flex-1">
                        <svg className="w-10 h-10 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="text-lg text-neutral-600 mb-6">
                          {testimonial.quote}
                        </p>
                        <div>
                          <p className="font-bold text-neutral-800">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {testimonial.role} • {testimonial.program}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex
                    ? 'bg-primary'
                    : 'bg-neutral-300 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0">
            <div className="container mx-auto px-4">
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setActiveIndex((current) =>
                      current === 0 ? testimonials.length - 1 : current - 1
                    );
                    setIsAutoPlaying(false);
                  }}
                  className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setActiveIndex((current) => (current + 1) % testimonials.length);
                    setIsAutoPlaying(false);
                  }}
                  className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
