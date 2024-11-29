import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import RSVPForm from './RSVPForm';

const events = [
  {
    id: 1,
    title: 'Annual Charity Gala',
    date: '2024-03-15T19:00:00',
    location: 'Grand Ballroom, Metropolitan Hotel',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Fundraising',
    description: 'Join us for an evening of celebration and support as we showcase our impact and raise funds for future initiatives.',
    highlights: [
      'Silent Auction',
      'Live Entertainment',
      'Impact Showcase',
      'Networking'
    ],
    capacity: 300,
    registered: 215
  },
  {
    id: 2,
    title: 'Clean Water Workshop',
    date: '2024-04-02T10:00:00',
    location: 'Community Center & Virtual',
    image: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Education',
    description: 'Learn about our clean water initiatives and how you can contribute to providing safe water access globally.',
    highlights: [
      'Expert Speakers',
      'Interactive Sessions',
      'Virtual Attendance Option',
      'Project Showcase'
    ],
    capacity: 150,
    registered: 89
  },
  {
    id: 3,
    title: 'Youth Leadership Summit',
    date: '2024-05-20T09:00:00',
    location: 'Innovation Campus',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Education',
    description: 'Empowering the next generation of change-makers through workshops, mentorship, and hands-on projects.',
    highlights: [
      'Leadership Training',
      'Project Planning',
      'Mentorship Sessions',
      'Networking'
    ],
    capacity: 200,
    registered: 156
  },
  {
    id: 4,
    title: 'Community Health Fair',
    date: '2024-06-10T11:00:00',
    location: 'Central Park',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Healthcare',
    description: 'Free health screenings, wellness workshops, and family activities to promote community health.',
    highlights: [
      'Health Screenings',
      'Wellness Workshops',
      'Kids Activities',
      'Health Education'
    ],
    capacity: 500,
    registered: 312
  },
  {
    id: 5,
    title: 'Sustainable Living Expo',
    date: '2024-07-15T10:00:00',
    location: 'Green Living Center',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Environment',
    description: 'Discover practical ways to live sustainably and support environmental conservation efforts.',
    highlights: [
      'Eco-friendly Products',
      'Sustainability Talks',
      'DIY Workshops',
      'Green Technology'
    ],
    capacity: 400,
    registered: 267
  }
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRSVP, setShowRSVP] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const scrollContainerRef = useRef(null);

  const categories = ['All', ...new Set(events.map(event => event.category))];

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === activeFilter));
    }
  }, [activeFilter]);

  const calculateTimeLeft = (eventDate) => {
    const difference = new Date(eventDate) - new Date();
    if (difference <= 0) return null;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    return { days, hours, minutes };
  };

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setScrollPosition(container.scrollLeft + scrollAmount);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleRSVPClick = (e, event) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowRSVP(true);
  };

  return (
    <section className="py-20 bg-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-handwritten text-primary-dark mb-4">
            Upcoming Events
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
            Join us at our upcoming events and be part of creating positive change in our communities.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-neutral-600 hover:bg-primary/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events Carousel */}
        <div className="relative">
          {/* Scroll Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-6 p-4 min-w-max">
              {filteredEvents.map((event) => {
                const timeLeft = calculateTimeLeft(event.date);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    onClick={() => handleEventClick(event)}
                    className="flex-shrink-0 w-[400px] bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                  >
                    {/* Event Image */}
                    <div className="relative h-48">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-primary">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-neutral-800 mb-2">
                        {event.title}
                      </h3>

                      {/* Date and Time */}
                      <div className="flex items-center text-neutral-600 mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">
                          {formatDate(event.date)} at {formatTime(event.date)}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center text-neutral-600 mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{event.location}</span>
                      </div>

                      {/* Countdown Timer */}
                      {timeLeft && (
                        <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                          <div className="text-sm text-neutral-600 mb-2">Time Remaining:</div>
                          <div className="flex justify-around">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
                              <div className="text-xs text-neutral-500">Days</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
                              <div className="text-xs text-neutral-500">Hours</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
                              <div className="text-xs text-neutral-500">Minutes</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Capacity Indicator */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-neutral-600 mb-1">
                          <span>Spots Remaining</span>
                          <span>{event.capacity - event.registered} of {event.capacity}</span>
                        </div>
                        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(event.registered / event.capacity) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>

                      {/* RSVP Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleRSVPClick(e, event)}
                        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300"
                      >
                        RSVP Now
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && !showRSVP && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Event Image */}
                <div className="relative h-64">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedEvent(null)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full"
                    >
                      <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-2">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-neutral-600">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">Date & Time</h4>
                      <p className="text-neutral-600">
                        {formatDate(selectedEvent.date)}
                        <br />
                        {formatTime(selectedEvent.date)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">Location</h4>
                      <p className="text-neutral-600">{selectedEvent.location}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-800 mb-2">Event Highlights</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedEvent.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center text-neutral-600">
                          <svg className="w-4 h-4 mr-2 text-accent-yellow" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* RSVP Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRSVP(true)}
                    className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300"
                  >
                    RSVP Now
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RSVP Form Modal */}
        <AnimatePresence>
          {showRSVP && selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowRSVP(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <RSVPForm
                  event={selectedEvent}
                  onClose={() => {
                    setShowRSVP(false);
                    setSelectedEvent(null);
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Events Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Events
          </motion.button>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Events;
