import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ icon, label, color = 'text-blue-600',id }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="
        flex flex-col items-center justify-center
        p-8 h-full w-full
        bg-white border border-slate-100 rounded-2xl
        text-center
        hover:shadow-lg hover:border-blue-100
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-200
        group
      "
      onClick={() => {navigate('/issue/new',{state:{category:id}})}}
    >
      {/* Icon */}
      <div
        className={`${color} mb-4 transform group-hover:scale-110 
                    transition-transform duration-200`}
      >
        {React.cloneElement(icon, {
          size: 32,
          strokeWidth: 1.5
        })}
      </div>

      {/* Label */}
      <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-900">
        {label}
      </span>
    </button>
  );
};

export default CategoryCard;