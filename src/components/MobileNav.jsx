import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Mission', path: '/mission' },
  { name: 'Projects', path: '/projects' },
  { name: 'Get Involved', path: '/get-involved' },
  { name: 'Events', path: '/events' },
  { name: 'Contact', path: '/contact' },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
  const location = useLocation();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Button */}
      <motion.button
        initial={false}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : -20 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg"
        aria-label="Open Menu"
      >
        <svg
          className="w-6 h-6 text-neutral-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm touch-none"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 shadow-xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-800"
              aria-label="Close Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Menu Items */}
            <nav className="h-full py-20 px-6 overflow-y-auto">
              <ul className="space-y-6">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.path}
                    custom={i}
                    variants={itemVariants}
                    className="border-b border-neutral-100 pb-4"
                  >
                    <Link
                      to={item.path}
                      className={`block text-lg font-medium ${
                        location.pathname === item.path
                          ? 'text-primary'
                          : 'text-neutral-800'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Call to Action */}
              <motion.div
                variants={itemVariants}
                custom={navItems.length}
                className="mt-8"
              >
                <Link
                  to="/donate"
                  className="block w-full py-3 px-4 bg-primary text-white text-center rounded-lg font-medium shadow-lg hover:bg-primary-dark transition-colors duration-300"
                >
                  Donate Now
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                custom={navItems.length + 1}
                className="mt-8 flex justify-center space-x-6"
              >
                <a
                  href="#"
                  className="text-neutral-500 hover:text-primary transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-primary transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.32,6.44c-.86.38-1.78.64-2.75.76,1-.59,1.76-1.53,2.12-2.65-.93.55-1.96.95-3.06,1.16-.88-.94-2.13-1.52-3.52-1.52-2.66,0-4.82,2.16-4.82,4.82,0,.38.04.75.12,1.1C7.69,9.92,4.07,8,1.64,5.16c-.42.72-.66,1.55-.66,2.44,0,1.67.85,3.15,2.15,4.01-.79-.02-1.53-.24-2.18-.6v.06c0,2.34,1.66,4.28,3.87,4.73-.4.11-.83.17-1.27.17-.31,0-.61-.03-.91-.08.61,1.92,2.39,3.31,4.49,3.35-1.65,1.29-3.73,2.06-5.99,2.06-.39,0-.77-.02-1.15-.07,2.13,1.37,4.66,2.17,7.37,2.17,8.84,0,13.67-7.32,13.67-13.67,0-.21,0-.42-.01-.62.94-.68,1.76-1.53,2.4-2.5Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-primary transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.16c3.2,0,3.58.01,4.85.07,1.17.05,1.81.25,2.23.41.56.22.96.48,1.38.9.42.42.68.82.9,1.38.16.42.36,1.06.41,2.23.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.05,1.17-.25,1.81-.41,2.23-.22.56-.48.96-.9,1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.81.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68,1.38-.9.42-.16,1.06-.36,2.23-.41,1.27-.06,1.65-.07,4.85-.07M12,0C8.74,0,8.33.01,7.05.07c-1.27.06-2.14.26-2.9.55-.79.31-1.46.72-2.13,1.38-.66.67-1.07,1.34-1.38,2.13-.29.76-.49,1.63-.55,2.9C.03,8.33.02,8.74.02,12s.01,3.67.07,4.95c.06,1.27.26,2.14.55,2.9.31.79.72,1.46,1.38,2.13.67.66,1.34,1.07,2.13,1.38.76.29,1.63.49,2.9.55,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c1.27-.06,2.14-.26,2.9-.55.79-.31,1.46-.72,2.13-1.38.66-.67,1.07-1.34,1.38-2.13.29-.76.49-1.63.55-2.9.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.14-.55-2.9-.31-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.07-2.13-1.38-.76-.29-1.63-.49-2.9-.55C15.67.01,15.26,0,12,0Z" />
                    <path d="M12,5.84c-3.4,0-6.16,2.76-6.16,6.16s2.76,6.16,6.16,6.16,6.16-2.76,6.16-6.16S15.4,5.84,12,5.84Zm0,10.15c-2.21,0-4-1.79-4-4s1.79-4,4-4,4,1.79,4,4-1.79,4-4,4Z" />
                    <circle cx="18.41" cy="5.59" r="1.44" />
                  </svg>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
