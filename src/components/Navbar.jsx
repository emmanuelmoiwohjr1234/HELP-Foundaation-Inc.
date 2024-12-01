import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    {
      title: 'About Us',
      dropdown: [
        { name: 'Our Mission', href: '/mission' },
        { name: 'Our Team', href: '/team' },
        { name: 'History', href: '/history' }
      ]
    },
    {
      title: 'Programs',
      dropdown: [
        { name: 'Education', href: '/programs/education' },
        { name: 'Healthcare', href: '/programs/healthcare' },
        { name: 'Community', href: '/programs/community' }
      ]
    },
    {
      title: 'Get Involved',
      dropdown: [
        { name: 'Volunteer', href: '/volunteer' },
        { name: 'Partner', href: '/partner' },
        { name: 'Events', href: '/events' }
      ]
    }
  ];

  const NavDropdown = ({ title, items }) => (
    <div className="relative group">
      <button className="text-neutral-700 hover:text-[rgb(var(--color-primary))] px-3 py-2 text-sm font-medium transition-colors">
        {title}
      </button>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute left-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
      >
        <div className="py-2 rounded-xl overflow-hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-[rgb(var(--color-primary))] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-handwritten  text-[rgb(var(--color-primary))]">
              HELP Foundation
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Nav Links with Dropdowns */}
            {navLinks.map((link) => (
              <NavDropdown key={link.title} title={link.title} items={link.dropdown} />
            ))}

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 px-4 py-1 text-sm text-neutral-700 bg-neutral-50 rounded-full focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  className="h-4 w-4 text-neutral-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Donate Button */}
            <Link
              to="/donate"
              className="btn btn-accent"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-[rgb(var(--color-primary))] hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[rgb(var(--color-primary))]"
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-neutral-100"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((section) => (
                <div key={section.title} className="py-2">
                  <h2 className="px-3 text-sm font-medium text-neutral-500">
                    {section.title}
                  </h2>
                  {section.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-[rgb(var(--color-primary))] hover:bg-neutral-50 rounded-md"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
              
              <div className="px-3 py-2">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 text-sm text-neutral-700 bg-neutral-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:bg-white"
                  />
                </form>
              </div>
              
              <div className="px-3 py-2">
                <Link
                  to="/donate"
                  className="w-full btn btn-accent justify-center"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
