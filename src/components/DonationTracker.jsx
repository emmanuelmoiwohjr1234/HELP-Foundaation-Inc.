import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const campaigns = [
  {
    id: 1,
    name: 'Education Initiative',
    goal: 50000,
    current: 35750,
    endDate: '2024-06-30',
    description: 'Supporting 100 underprivileged students with scholarships and supplies',
    impact: '100 students will receive education support',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Community Health Program',
    goal: 75000,
    current: 45000,
    endDate: '2024-07-15',
    description: 'Providing medical care and health education to rural communities',
    impact: '500 families will receive healthcare access',
    color: 'bg-green-500',
  },
  {
    id: 3,
    name: 'Food Security Project',
    goal: 30000,
    current: 28500,
    endDate: '2024-05-30',
    description: 'Ensuring nutritious meals for vulnerable families',
    impact: '200 families will receive food support',
    color: 'bg-yellow-500',
  },
];

const DonationTracker = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [recentDonations, setRecentDonations] = useState([
    { name: 'Anonymous', amount: 50, campaign: 'Education Initiative', timestamp: new Date() },
    { name: 'Sarah M.', amount: 100, campaign: 'Community Health Program', timestamp: new Date() },
    { name: 'John D.', amount: 75, campaign: 'Food Security Project', timestamp: new Date() },
  ]);

  // Simulate real-time donation updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAmount = Math.floor(Math.random() * 100) + 10;
      const randomCampaign = campaigns[Math.floor(Math.random() * campaigns.length)];
      const newDonation = {
        name: 'Anonymous',
        amount: randomAmount,
        campaign: randomCampaign.name,
        timestamp: new Date(),
      };

      setRecentDonations(prev => [newDonation, ...prev.slice(0, 4)]);
      
      // Update campaign progress
      campaigns.forEach(campaign => {
        if (campaign.name === randomCampaign.name) {
          campaign.current = Math.min(campaign.current + randomAmount, campaign.goal);
        }
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate) - new Date();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  const calculateProgress = (current, goal) => {
    return (current / goal) * 100;
  };

  const handleDonation = (e) => {
    e.preventDefault();
    const amount = parseFloat(donationAmount);
    if (amount > 0) {
      const newDonation = {
        name: 'You',
        amount,
        campaign: selectedCampaign.name,
        timestamp: new Date(),
      };
      setRecentDonations(prev => [newDonation, ...prev.slice(0, 4)]);
      selectedCampaign.current = Math.min(selectedCampaign.current + amount, selectedCampaign.goal);
      setDonationAmount('');
      setShowDonationModal(false);
    }
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-handwritten text-primary-dark mb-4">
            Make an Impact
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Track our ongoing campaigns and see the real-time impact of your donations.
            Every contribution brings us closer to our goals.
          </p>
        </motion.div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {campaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-800 mb-2">
                  {campaign.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {campaign.description}
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-neutral-600 mb-2">
                    <span>{formatCurrency(campaign.current)}</span>
                    <span>{formatCurrency(campaign.goal)}</span>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${campaign.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateProgress(campaign.current, campaign.goal)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">
                    {calculateTimeLeft(campaign.endDate)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      setShowDonationModal(true);
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors duration-300"
                  >
                    Donate Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Donations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-neutral-800 mb-4">
            Recent Donations
          </h3>
          <div className="space-y-4">
            {recentDonations.map((donation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center border-b border-neutral-100 pb-4 last:border-none"
              >
                <div>
                  <p className="font-medium text-neutral-800">{donation.name}</p>
                  <p className="text-sm text-neutral-500">{donation.campaign}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">
                    {formatCurrency(donation.amount)}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {donation.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Donation Modal */}
        <AnimatePresence>
          {showDonationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowDonationModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              >
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                  Donate to {selectedCampaign.name}
                </h3>
                <p className="text-neutral-600 mb-6">
                  Your donation will help: {selectedCampaign.impact}
                </p>
                <form onSubmit={handleDonation}>
                  <div className="mb-6">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Donation Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                        $
                      </span>
                      <input
                        type="number"
                        id="amount"
                        min="1"
                        step="1"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300"
                    >
                      Donate
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowDonationModal(false)}
                      className="flex-1 bg-neutral-200 text-neutral-800 py-2 rounded-lg font-medium hover:bg-neutral-300 transition-colors duration-300"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DonationTracker;
