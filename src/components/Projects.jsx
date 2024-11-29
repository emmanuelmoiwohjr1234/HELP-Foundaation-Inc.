import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample project data - replace with your actual data
const projectsData = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    category: 'Infrastructure',
    region: 'East Africa',
    status: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-4.0.3',
    impact: { metric: 'Wells Built', value: 50, target: 100 },
    description: 'Providing clean water access to remote communities.',
  },
  {
    id: 2,
    title: 'Education for All',
    category: 'Education',
    region: 'South Asia',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3',
    impact: { metric: 'Students Enrolled', value: 2500, target: 2500 },
    description: 'Building schools and providing quality education.',
  },
  {
    id: 3,
    title: 'Healthcare Outreach',
    category: 'Healthcare',
    region: 'West Africa',
    status: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3',
    impact: { metric: 'People Treated', value: 7500, target: 10000 },
    description: 'Mobile healthcare clinics for remote areas.',
  },
  {
    id: 4,
    title: 'Sustainable Farming',
    category: 'Agriculture',
    region: 'South America',
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?ixlib=rb-4.0.3',
    impact: { metric: 'Farms Established', value: 25, target: 100 },
    description: 'Teaching sustainable farming practices.',
  },
];

const categories = ['All', ...new Set(projectsData.map(project => project.category))];
const regions = ['All', ...new Set(projectsData.map(project => project.region))];
const statuses = ['All', ...new Set(projectsData.map(project => project.status))];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('projects-section');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filtered = projectsData.filter(project => {
      const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
      const regionMatch = selectedRegion === 'All' || project.region === selectedRegion;
      const statusMatch = selectedStatus === 'All' || project.status === selectedStatus;
      return categoryMatch && regionMatch && statusMatch;
    });
    setFilteredProjects(filtered);
  }, [selectedCategory, selectedRegion, selectedStatus]);

  const FilterButton = ({ isSelected, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isSelected
          ? 'bg-primary text-white shadow-lg'
          : 'bg-neutral-200 text-neutral-600 hover:bg-primary/10'
      }`}
    >
      {children}
    </button>
  );

  const ProgressBar = ({ value, target }) => {
    const percentage = (value / target) * 100;
    return (
      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-accent-yellow rounded-full"
        />
      </div>
    );
  };

  const Counter = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const duration = 2000; // 2 seconds
        const steps = 50;
        const increment = value / steps;
        const stepDuration = duration / steps;

        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, stepDuration);

        return () => clearInterval(timer);
      }
    }, [value, isVisible]);

    return <span className="font-bold text-2xl">{count.toLocaleString()}</span>;
  };

  return (
    <section id="projects-section" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-handwritten text-primary-dark mb-4">
            Our Projects
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore our initiatives across the globe and see the impact we're making together.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <FilterButton
                key={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </div>

          {/* Regions */}
          <div className="flex flex-wrap gap-2 justify-center">
            {regions.map((region) => (
              <FilterButton
                key={region}
                isSelected={selectedRegion === region}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </FilterButton>
            ))}
          </div>

          {/* Statuses */}
          <div className="flex flex-wrap gap-2 justify-center">
            {statuses.map((status) => (
              <FilterButton
                key={status}
                isSelected={selectedStatus === status}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-primary-dark">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-dark mb-2">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Impact Metrics */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-neutral-500">{project.impact.metric}</span>
                      <span className="text-sm text-neutral-700">
                        <Counter value={project.impact.value} /> / {project.impact.target}
                      </span>
                    </div>
                    <ProgressBar
                      value={project.impact.value}
                      target={project.impact.target}
                    />
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {project.category}
                    </span>
                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                      {project.region}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-neutral-500">No projects match your current filters.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
