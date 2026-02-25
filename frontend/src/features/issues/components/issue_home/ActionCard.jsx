import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { infoToast } from '../../../../utils/Toaster';
import { fadeInUp } from '../../ui/motion';

const ActionCard = ({ icon, title, desc, badge, path }) => {
  const navigate = useNavigate();
  const { access_token } = useSelector(s => s.auth);

  const handleClick = () => {
    if (access_token) navigate(path);
    else {
      infoToast({ title: 'Login required', description: 'Please login to continue.' });
      navigate('/landing');
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      onClick={handleClick}
      className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md cursor-pointer flex gap-4"
    >
      <div className="p-3 bg-blue-50 rounded-xl">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-bold">{title}</h3>
          {badge && <span className="text-xs font-bold">{badge}</span>}
        </div>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </motion.div>
  );
};

export default ActionCard;