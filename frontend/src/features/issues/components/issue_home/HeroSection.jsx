import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { infoToast } from '../../../../utils/Toaster';
import HeroIllustration from './HeroIllustration';
import { containerVariants, fadeInUp } from '../../ui/motion';

const HeroSection = () => {
  const navigate = useNavigate();
  const { access_token } = useSelector(s => s.auth);

  const handleReport = () => {
    if (access_token) navigate('/issue/new');
    else {
      infoToast({ title: 'Please login', description: 'Login required to continue.' });
      navigate('/landing');
    }
  };

  return (
    <section className="relative pt-20 pb-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1]"
          >
            Report Civic Issues. <br />
            <span className="text-blue-600">Track Real Change.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-xl text-slate-600 max-w-2xl"
          >
            Report infrastructure concerns and track resolutions transparently.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10 flex gap-4">
            <button
              onClick={handleReport}
              className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-xl shadow-lg"
            >
              Report Issue
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 rounded-xl">
              View Nearby Complaints
            </button>
          </motion.div>
        </motion.div>

        <HeroIllustration />
      </div>
    </section>
  );
};

export default HeroSection;