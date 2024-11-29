import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';

const stories = [
  {
    id: 1,
    year: 2020,
    title: "Sarah's Educational Journey",
    category: "Education",
    beneficiary: "Sarah Johnson",
    location: "Downtown Community",
    content: `Sarah, a bright 16-year-old from our downtown community, faced significant barriers to education. 
    Through our scholarship program, she not only received financial support but also mentoring and resources. 
    Today, she's excelling in her studies and inspiring other young students in her community.`,
    impact: "Full scholarship and mentoring support",
    outcome: "Currently maintaining a 4.0 GPA and mentoring younger students",
    media: "https://source.unsplash.com/random/800x600/?student",
  },
  {
    id: 2,
    year: 2021,
    title: "Community Health Initiative",
    category: "Healthcare",
    beneficiary: "Martinez Family",
    location: "East Side District",
    content: `The Martinez family, like many in their neighborhood, struggled to access quality healthcare. 
    Our mobile health clinic initiative brought regular check-ups, vaccinations, and health education right to their doorstep. 
    This program has transformed how their entire community approaches preventive healthcare.`,
    impact: "Regular healthcare access for 5 family members",
    outcome: "Improved health outcomes and preventive care adoption",
    media: "https://source.unsplash.com/random/800x600/?healthcare",
  },
  {
    id: 3,
    year: 2022,
    title: "Green Space Revival",
    category: "Environment",
    beneficiary: "Westside Community",
    location: "Westside Neighborhood",
    content: `What was once an abandoned lot has been transformed into a thriving community garden. 
    Local residents now have access to fresh produce, educational programs, and a beautiful space for community gatherings. 
    The project has brought together people of all ages and backgrounds.`,
    impact: "Created 2-acre community garden space",
    outcome: "Provides fresh produce to 100+ families monthly",
    media: "https://source.unsplash.com/random/800x600/?garden",
  },
  {
    id: 4,
    year: 2023,
    title: "Youth Tech Program",
    category: "Technology",
    beneficiary: "Local Youth Center",
    location: "North District",
    content: `Our technology education initiative equipped the local youth center with a modern computer lab and coding curriculum. 
    Young people now have access to digital literacy programs, coding workshops, and career development opportunities in tech. 
    The program has already helped several participants secure internships.`,
    impact: "Established computer lab with 20 workstations",
    outcome: "Trained 150+ youth in digital skills",
    media: "https://source.unsplash.com/random/800x600/?technology",
  },
];

const InteractiveStories = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleYearClick = (year) => {
    setSelectedStory(stories.find(story => story.year === year));
  };

  const years = [...new Set(stories.map(story => story.year))];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-handwritten text-primary-dark mb-4">
            Our Impact Stories
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our journey of making a difference through the years. Each story represents
            lives touched and communities transformed through our initiatives.
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="mb-12">
          <div className="flex justify-center items-center space-x-8">
            {years.map((year) => (
              <motion.button
                key={year}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleYearClick(year)}
                className={`relative px-6 py-3 rounded-full ${
                  selectedStory?.year === year
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                } transition-colors duration-300`}
              >
                {year}
                {selectedStory?.year === year && (
                  <motion.div
                    layoutId="timeline-indicator"
                    className="absolute -bottom-2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Story Display */}
        <AnimatePresence mode="wait">
          {selectedStory && (
            <motion.div
              key={selectedStory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Story Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative h-[400px] rounded-xl overflow-hidden"
              >
                <img
                  src={selectedStory.media}
                  alt={selectedStory.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-sm font-medium mb-2">{selectedStory.category}</p>
                  <h3 className="text-2xl font-bold mb-2">{selectedStory.title}</h3>
                  <p className="text-sm opacity-90">{selectedStory.location}</p>
                </div>
              </motion.div>

              {/* Story Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xl font-bold text-neutral-800 mb-2">The Story</h4>
                  <p className="text-neutral-600 leading-relaxed">{selectedStory.content}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-neutral-800 mb-2">Impact</h5>
                    <p className="text-sm text-neutral-600">{selectedStory.impact}</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-neutral-800 mb-2">Outcome</h5>
                    <p className="text-sm text-neutral-600">{selectedStory.outcome}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300"
                >
                  Support Similar Projects
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI-Powered Story Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-neutral-50 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-neutral-800 mb-4">
            Discover More Stories
          </h3>
          <Slider {...sliderSettings}>
            {stories
              .filter(story => story.id !== selectedStory?.id)
              .map(story => (
                <div key={story.id}>
                  <p className="text-sm text-primary font-medium mb-2">
                    {story.category}
                  </p>
                  <h4 className="text-lg font-bold text-neutral-800 mb-2">
                    {story.title}
                  </h4>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {story.content}
                  </p>
                </div>
              ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveStories;
